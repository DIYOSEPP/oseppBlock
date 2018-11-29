"use strict";


/* Interprets an ArrayBuffer as UTF-8 encoded string data. */
var ab2str = function (buf) {
    var bufView = new Uint8Array(buf);
    var encodedString = String.fromCharCode.apply(null, bufView);
    return decodeURIComponent(escape(encodedString));
}
/* Converts a string to UTF-8 encoding in a Uint8Array; returns the array buffer. */
var str2ab = function (str) {
    var encodedString = unescape(encodeURIComponent(str));
    var bytes = new Uint8Array(encodedString.length);
    for (var i = 0; i < encodedString.length; ++i) {
        bytes[i] = encodedString.charCodeAt(i);
    }
    return bytes.buffer;
}

function lockUI() {
    $('#upload').addClass("svg_acting");
}
function unlockUI() {
    $('#upload').removeClass("svg_acting");
}

var logmsg = function (msg) {
    if (msg) {
        var el = document.getElementById("msgTextArea");
        var scroll = el.scrollHeight - el.clientHeight - el.scrollTop;
        var chile = document.createElement("span");
        chile.innerText = msg;
        el.appendChild(chile);
        if (scroll < chile.offsetHeight * 1.5) {
            if (el.childNodes.length > 600) {
                for (var i = 0; i < el.childNodes.length - 500; i++)el.removeChild(el.firstChild);
            } else if (el.innerHTML.length > 20 * 1024) {
                var len = el.innerHTML.length - 16 * 1024;
                while (len > 0) {
                    if (el.firstChild.innerHTML) len -= el.firstChild.innerHTML.length;
                    el.removeChild(el.firstChild);
                }
            }
            el.scrollTop = el.scrollHeight;
        }
    }
}
var serial = null;

var msgTextAreaHeight = 300;
var msgcache = "";
var timeFlag = null;
var onSerialEvent = function (event, data) {
    switch (event) {
        case 'data'://on serial data in
            if (!data) break;
            msgcache += data;
            if (timeFlag) break;
            timeFlag = true;
            setTimeout(() => {
                timeFlag = false;
                logmsg(msgcache);
                msgcache = '';
            }, 25);
            break;
        case 'open'://when serial open
            $("#connect").removeClass("svg_disable");
            $("#send,#reset,#sendtext,#line_ending").show();
            $("#serial_upload_msg").height(msgTextAreaHeight);
            break;
        case 'close'://when serial close
            $('#connect').addClass("svg_disable");
            $("#send,#reset,#sendtext,#line_ending").hide();
            break;
        case 'error'://serial PORT error
            break;
        case 'hwreset'://uno has reset
            break;
        case 'option'://option changed(baudrate)
            break;
        case 'uploading'://uploading msg|err
            if (data) $('#msgUpload').append($('<span>' + data + '</span>'));
            break;
        case 'uploaded'://upload done|err
            if (data) $('#msgUpload').append($('<span>' + data + '</span><br/>'));
            unlockUI();
            break;
        default: break;
    }
}

function opendialog() {
    const remote = require("electron").remote;
    const dialog = remote.dialog;
    var file = dialog.showOpenDialog({ title: "set arduino path", properties: ["openFile"] });
    if (file) {
        file = file[0];
        const path = require("path");
        var extName = path.extname(file);
        if (extName == ".app") {
            window.localStorage.arduinoPath = path.join(file, "Contents", "Java");
        } else {
            window.localStorage.arduinoPath = path.dirname(file);
        }
        $('#ArduinoPath').text(file);
        $('#setArduinoPathFeedback').show();
    }
}


function verifyArduinoPath(path) {
    const fs = require("fs");
    var existBuilder = fs.existsSync(path + "/arduino-builder") ||
        fs.existsSync(path + "/arduino-builder.exe");
    var existAvrdude = fs.existsSync(path + "/hardware/tools/avr/bin/avrdude") ||
        fs.existsSync(path + "/hardware/tools/avr/bin/avrdude.exe");
    var ok = existAvrdude && existBuilder;
    return ok;
}

function insideArduinoPath() {
    const fs = require("fs");
    const path = require("path");
    const { app } = require("electron").remote;
    var curPath = path.resolve(app.getPath("exe"));
    curPath = path.dirname(curPath);
    if (process.platform == "darwin") {
        curPath = path.resolve(curPath, "..", "..", "..");
    }
    var dirset = [curPath];
    while (dirset.length) {
        var dir = dirset.pop();
        if (verifyArduinoPath(dir)) return dir;
        var files = fs.readdirSync(dir);
        for (var fn, i = 0; fn = files[i]; i++) {
            if (fn.toLowerCase().indexOf("arduino") < 0) continue;
            var fp = path.join(dir, fn);
            var st = fs.statSync(fp);
            if (st.isDirectory()) {
                if (verifyArduinoPath(fp)) {
                    return fp;
                } else if (verifyArduinoPath(path.join(fp, "Contents", "Java"))) {
                    return path.join(fp, "Contents", "Java");
                } else {
                    dirset.push(fp);
                }
            }
        }
    }
    return "";
}

function getArduinoPath() {
    const fs = require("fs");
    const path = require("path");
    var arduinoPath = window.localStorage.arduinoPath;
    if (!verifyArduinoPath(arduinoPath)) {
        try {
            arduinoPath = insideArduinoPath();
            if (arduinoPath) window.localStorage.arduinoPath = arduinoPath;
        } catch (e) {
            arduinoPath = "";
        }
    }

    if (!arduinoPath) {
        $('#setArduinoPath').dialog({ closeOnEscape: true, width: 500 });
        $('#setArduinoPathFeedback').hide();
        throw "noarduinopath";
    }
    return arduinoPath;
}

function code2ArduinoIDE() {
    try {
        var arduinoPath = getArduinoPath();
        try {
            const fs = require("fs");
            const path = require("path");
            function writeFile() {
                var tmpDir = HWAgent.nodeGenerator.getTmpDir();
                tmpDir = fs.mkdtempSync(tmpDir + "/unname");
                var filename = path.basename(tmpDir);
                filename = tmpDir + "/" + filename + ".ino";
                fs.writeFileSync(filename, getCode());
                return filename;
            }
            if (fs.existsSync(arduinoPath + "/arduino_debug.exe")) {
                const spawn = require("child_process").spawn;
                var f = writeFile();
                const ide = spawn("\"" + arduinoPath + "/arduino_debug\"", ["\"" + f + "\""], { shell: true });
            } else if (fs.existsSync(path.join(arduinoPath, "/..", "/MacOS/Arduino"))) {
                const spawn = require("child_process").spawn;
                var f = writeFile();
                const ide = spawn("\"" + path.join(arduinoPath, "/..", "/MacOS/Arduino") + "\"", ["\"" + f + "\""], { shell: true });
            } else if (fs.existsSync(arduinoPath + "/arduino")) {
                const spawn = require("child_process").spawn;
                var f = writeFile();
                const ide = spawn("\"" + path.join(arduinoPath, "/arduino") + "\"", ["\"" + f + "\""], { shell: true });
            } else {
                throw "Invalid Arduino Path";
            }
            $('#msgUpload').empty()
                .append('<span>Arduino IDE is starting, please wait a moment!</span>')
                .dialog({ width: 640, height: 400, title: "coding in arduino IDE" });
            // setTimeout(() => {
            //     $('#msgUpload').dialog('close');
            // }, 3000);
        } catch (e) {
            $('#msgUpload').empty()
                .append('<span>Failed to start arduino IDE!</span>')
                .dialog({ width: 640, height: 400, title: "coding in arduino IDE" });
            // setTimeout(() => {
            //     $('#msgUpload').dialog('close');
            // }, 3000);
        }
    } catch (e) {
        console.log(e);
    }
}

function doVerify() {
    var verifyEvent = function (event, data) {
        if (data) {
            $('#msgUpload').append('<span>' + data + '</span>');
        }
        if (event == 'compiled') {
            // setTimeout(() => {
            //     $('#msgUpload').dialog('close');
            // }, 3000);
        }
    };
    $('#msgUpload').empty().dialog({ width: 640, height: 400, title: "Verify code" });
    try {
        getArduinoPath();//check arduino path
        if (HWAgent.Generator.regAgents.length > 0) {
            var agent = HWAgent.Generator.regAgents[0];
            new agent(getCode(), verifyEvent);
        } else {
            unlockUI();
        }
        //will trig upload on evemt callback when it done
    } catch (err) {
        unlockUI();
    }
}

function doUpload() {
    var generotor = null;
    var generotorEvent = function (event, data) {
        if (event == 'compiling') {//compiling msg|err
            if (data) $('#msgUpload').append('<span>' + data + '</span>');
        } else if (event == 'compiled') {//compiling done|err
            if (data) $('#msgUpload').append('<span>' + data + '</span><br/>');
            if (generotor && generotor.hex) {
                if (serial && serial.isOpened()) {
                    serial.upload(generotor.hex);
                } else {
                    var port = $('#SelectComPort').val();
                    HWAgent.Serial.list(function () {
                        var agent = HWAgent.Serial.findAgent(port);
                        if (agent == null) return;
                        serial = new agent(
                            port,
                            115200,
                            onSerialEvent
                        );
                        serial.upload(generotor.hex);
                    });
                }
            } else {
                unlockUI();
            }
        }
    };

    lockUI();
    try {
        getArduinoPath();//check arduino path
        if (HWAgent.Generator.regAgents.length > 0) {
            var agent = HWAgent.Generator.regAgents[0];
            $('#msgUpload').empty().dialog({ width: 640, height: 400, title: "Uploading" });
            generotor = new agent(getCode(), generotorEvent);
        } else {
            unlockUI();
        }
        //will trig upload on evemt callback when it done
    } catch (err) {
        unlockUI();
    }
}


var initSerialUI = function () {
    try {
        $("#SelectBandrate").autocomplete({
            source: [
                "300",
                "1200",
                "2400",
                "4800",
                "9600",
                "14400",
                "19200",
                "28800",
                "38400",
                "57600",
                "74880",
                "115200",
                "128000",
                "230400",
                "250000",
                "1000000",
                "2000000",
            ],
            minLength: 0,
            position: {
                my: "center bottom",
                at: "top"
            }
        }).focus(function () {
            $(this).autocomplete("search", "");
        }).on("autocompletechange", function () {
            try {
                var baud = parseInt($(this).val());
                if (baud != window.localStorage.baudrate) {
                    window.localStorage.baudrate = baud;
                    if (serial && serial.isOpened()) {
                        serial.updateOption({ baudRate: baud });
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }).val(window.localStorage.baudrate || "115200");

        $("#SelectComPort").autocomplete({
            source: function (request, response) {
                var fillport = function (ports) {
                    var option = [];
                    for (var i = 0; i < ports.length; i++) {
                        option.push(ports[i].value);
                    }
                    response(option);
                }
                HWAgent.Serial.list(fillport);
            },
            minLength: 0,
            position: {
                my: "center bottom",
                at: "top"
            }
        }).focus(function () {
            $(this).autocomplete("search", "");
        }).on("autocompletechange", function () {
            try {
                var port = this.value;
                if (port != window.localStorage.port) {
                    window.localStorage.port = port;
                    if (serial && serial.isOpened()) serial.close();
                }
            } catch (e) {
                console.log(e);
            }
        }).val(window.localStorage.port || "");

        $('#connect').click(function () {
            if (serial && serial.isOpened()) {//close
                serial.close();
            } else {//open
                var port = $('#SelectComPort').val();
                if (port.toLowerCase() == 'debug') {
                    try {
                        var browser = require("electron").remote.getCurrentWindow();
                        browser.openDevTools();
                    } finally {
                        return;
                    }
                }
                var baud = parseInt($("#SelectBandrate").val());
                HWAgent.Serial.list(function () {
                    var agent = HWAgent.Serial.findAgent(port);
                    if (agent == null) return;
                    serial = new agent(
                        port,
                        baud,
                        onSerialEvent
                    );
                    serial.open();
                });
            }
        });

        $('#reset').click(function () {
            if (serial && ('resetHW' in serial)) serial.resetHW();
        });

        $('#send').click(function () {
            if (!serial) return;
            if (!serial.isOpened()) return;
            var text = $('#sendtext').val();
            if (!text) return;
            var ending = $('#line_ending').val();
            switch (ending) {
                case 'n':
                    text += "\n";
                    break;
                case 'r':
                    text += "\r";
                    break;
                case 'nr':
                    text += "\n\r";
            }
            serial.write(text);
            $('#sendtext').focus().select();
        }).keypress(function (event) {
            if (event.keyCode == 13) {
                $(this).click();
            }
        });

        $('#sendtext').keypress(function (event) {
            if (event.keyCode == 13) {
                $('#send').click();
            }
        });

        $('#toggle_serial_box').click(function () {
            var $el = $('#serial_upload_msg');
            if ($el.attr('style').indexOf('height') >= 0) {
                $el.css('height', '');
            } else {
                $el.height(msgTextAreaHeight);
            }
            return;

        });

        $("#verify").click(doVerify);

        $('#upload').click(doUpload);

        $('#send_to_arduino_ide').click(code2ArduinoIDE);

        $('#serial_upload_msg,#code_menu,#footView').show();

        $('#blocklyarea').removeAttr('style');
    } catch (e) {
        console.log(e);
    }
};


var getOnlineVersionNumber = function (callback) {
    const { net } = require("electron").remote;
    const request = net.request("http://www.osepp.com/block/package.json?d=" + Date());
    request.on("response", (response) => {
        if (response.statusCode == 200) {
            response.on("data", (chunk) => {
                var json = JSON.parse(chunk);
                if (json.version) {
                    if (callback) {
                        callback(json.version);
                    }
                }
            });
        }
    });
    request.on("error", (error) => {
        console.log(error);
    });
    request.end();
};

$(document).ready(initSerialUI);

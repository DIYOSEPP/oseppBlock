"use strict";

function lockUI() {
    $('#upload').addClass("svg_acting");
}
function unlockUI() {
    $('#upload').removeClass("svg_acting");
}

var msgcache = new Uint8Array(1024 * 16);
var msgcache_index = 0;
var timeFlag = null;

var logmsg = function (msg) {
    if (msg) {
        msg = new Uint8Array(msg);
        if (msg.length >= msgcache.length) {
            msgcache.set(new Uint8Array(msg.buffer, msg.length - msgcache.length));
            msgcache_index = msgcache.length;
        } else {
            var toTail = Math.min(msg.length, msgcache.length - (msgcache_index % msgcache.length));
            msgcache.set(new Uint8Array(msg.buffer, 0, toTail), msgcache_index % msgcache.length);
            msgcache.set(new Uint8Array(msg.buffer, toTail), 0);
            msgcache_index += msg.length;
        }
        if (timeFlag) return;
        timeFlag = true;
        setTimeout(() => {
            timeFlag = false;
            var el = document.getElementById("msgTextArea");
            var scroll = el.scrollHeight - el.clientHeight - el.scrollTop;
            if (scroll < el.offsetHeight * 1.5) {
                if (msgcache_index < msgcache.length) {
                    var txt = new Uint8Array(msgcache.buffer, 0, msgcache_index);
                } else {
                    var txt = new Uint8Array(msgcache.length);
                    var pi = msgcache_index % msgcache.length;
                    txt.set(new Uint8Array(msgcache.buffer, pi));
                    txt.set(new Uint8Array(msgcache.buffer, 0, pi), txt.length - pi);
                }
                el.innerText = new TextDecoder("utf-8").decode(txt);
                el.scrollTop = el.scrollHeight;
            }
        }, 25);
    }
}

var serial = null;
var msgTextAreaHeight = 300;

var onSerialEvent = function (event, data) {
    switch (event) {
        case 'data'://on serial data in
            logmsg(data);
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
    var file = dialog.showOpenDialogSync({ title: Blockly.Msg['selectArduinoPath'], properties: ["openFile"] });
    if (file) {
        file = file[0];
        const path = require("path");
        var extName = path.extname(file);
        if (extName == ".app") {
            window.localStorage.arduinoIDEPath = path.join(file, "Contents", "Java");
        } else {
            window.localStorage.arduinoIDEPath = path.dirname(file);
        }
        //$('#ArduinoPath').text(file);
        $('#' + Blockly.Msg['setArduinoPathFeedback'] + ' [mid]').text(file);
        $('#' + Blockly.Msg['setArduinoPathFeedback']).show();
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

    var arduinoPath = window.localStorage.buildinArduinoIDEPath || '';
    if (verifyArduinoPath(arduinoPath)){
        return arduinoPath;
    }else{
        try {
            arduinoPath = insideArduinoPath();
            if (arduinoPath) {
                window.localStorage.buildinArduinoIDEPath = arduinoPath;
                return arduinoPath;
            } else {
                arduinoPath = "";
                window.localStorage.buildinArduinoIDEPath = '';
            }
        } catch (e) {
            arduinoPath = "";
            window.localStorage.buildinArduinoIDEPath = '';
        }
    }

    arduinoPath = window.localStorage.arduinoIDEPath;

    if (!verifyArduinoPath(arduinoPath)) {
        $('#' + Blockly.Msg['setArduinoPath']).dialog({ closeOnEscape: true, width: 500 });
        $('#' + Blockly.Msg['setArduinoPathFeedback']).hide();
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
                .append('<span>' + Blockly.Msg['sendCode2ArduinoIDE'] + '</span>')
                .dialog({ width: 640, height: 400, title: Blockly.Msg['sendCode2ArduinoIDE_title'], closeOnEscape: true });
            // setTimeout(() => {
            //     $('#msgUpload').dialog('close');
            // }, 3000);
        } catch (e) {
            $('#msgUpload').empty()
                .append('<span>Failed to start arduino IDE!</span>')
                .dialog({ width: 640, height: 400, title: Blockly.Msg['sendCode2ArduinoIDE_title'], closeOnEscape: true });
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

    try {
        getArduinoPath();//check arduino path
        if (HWAgent.Generator.regAgents.length > 0) {
            $('#msgUpload').empty().dialog({ width: 640, height: 400, title: Blockly.Msg['verifycode'], closeOnEscape: true });
            var agent = HWAgent.Generator.regAgents[0];
            new agent(getCode(), verifyEvent);
        }
    } catch (err) {
        $('#msgUpload').append('<span>' + Blockly.Msg['verifycode_error'] + '</span><br/>').append('<span>' + err + '</span>');
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
            $('#msgUpload').empty().dialog({ width: 640, height: 400, title: Blockly.Msg['upload'], closeOnEscape: true });
            generotor = new agent(getCode(), generotorEvent);
        } else {
            unlockUI();
        }
        //will trig upload on evemt callback when it done
    } catch (err) {
        unlockUI();
    }
}

function showORhideUI() {
    var electron_ok = false;
    var serial_ok = false;
    var generotor_ok = false;
    try {
        require("serialport");
        electron_ok = true;
    } catch (e) {
        electron_ok = false;
    }
    if (HWAgent.Serial.regAgents.length > 0) serial_ok = true;
    if (HWAgent.Generator.regAgents.length > 0) generotor_ok = true;

    if (serial_ok) {
        $('#serial_upload_msg,#code_menu,#footView').show();
        $('#blocklyarea').css('bottom', '');//remove bottom:0
        if (generotor_ok) $('#upload').show();
    } else {
        $('#serial_upload_msg,#code_menu,#footView').hide();
        $('#blocklyarea').css('bottom', '0');//remove bottom:0
        $('#upload').hide();
    }
    if (generotor_ok) {
        $("#verify").show();
    } else {
        $("#verify").hide();
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
        try {
            HWAgent.Serial.list(() => { });
        } catch (e) { }
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

        showORhideUI();
    } catch (e) {
        console.log(e);
    }
};

$(document).ready(initSerialUI);

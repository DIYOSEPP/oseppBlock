'use strict';


/* Interprets an ArrayBuffer as UTF-8 encoded string data. */
var ab2str = function (buf) {
    var bufView = new Uint8Array(buf);
    var encodedString = String.fromCharCode.apply(null, bufView);
    return decodeURIComponent(escape(encodedString));
};

/* Converts a string to UTF-8 encoding in a Uint8Array; returns the array buffer. */
var str2ab = function (str) {
    var encodedString = unescape(encodeURIComponent(str));
    var bytes = new Uint8Array(encodedString.length);
    for (var i = 0; i < encodedString.length; ++i) {
        bytes[i] = encodedString.charCodeAt(i);
    }
    return bytes.buffer;
};

var serial = null;


var fillPortList = function () {
    var select = this;
    if (!select) return;
    try {
        var fillOption = function (err, ports) {
            if (ports.length <= 0) throw "noport";
            var port = select.options[select.selectedIndex];
            if (port) port = port.value; else port = null;
            var newIndex = -1;

            select.options.length = 0;
            for (var i = 0; i < ports.length; i++) {
                select.add(new Option(ports[i].comName, ports[i].comName));
                if (ports[i].path == port) newIndex = i;
            }
            if (newIndex >= 0) select.selectedIndex = newIndex; else select.selectedIndex = ports.length - 1;
        }

        var serialport = require('serialport');
        serialport.list(fillOption)

    } catch (e) {
        select.options.length = 0;
        select.add(new Option('select com port', ''));
    }
}

var onSerialData = function (data) {
    var el = document.getElementById("msgTextArea");
    var chile = document.createElement('span');
    chile.innerText = data;
    el.appendChild(chile);
    el.scrollTop = el.scrollHeight;
}
var onSerialError = function (error) {
    //fillPortList();
    console.log(error);
    if (!serial.isOpen()) serial = null;
}

function addClass(element, classText) {
    var e = document.getElementById(element);
    if (e) {
        var text = e.getAttribute('class');
        if (text) text = text.trim();
        e.setAttribute('class', text + ' ' + classText);
    }
}
function delClass(element, classText) {
    var e = document.getElementById(element);
    if (e) {
        var text = e.getAttribute('class');
        if (text) {
            text = text.replace(classText, '');
            text = text.trim();
        }
        e.setAttribute('class', text);
    }
}

var onSerialOpen = function () {
    delClass('connect', 'svg_disable');
    delClass('send', 'svg_hide');
    delClass('reset', 'svg_hide');
    delClass('sendtext', 'svg_hide');
    delClass('line_ending', 'svg_hide');
    delClass('serial_upload_msg', 'serial_upload_msg_close');
    addClass('serial_upload_msg', 'serial_upload_msg_open');
}
var onSerialClose = function () {
    addClass('connect', 'svg_disable');
    addClass('send', 'svg_hide');
    addClass('reset', 'svg_hide');
    addClass('sendtext', 'svg_hide');
    addClass('line_ending', 'svg_hide');
    serial = null;
}

function serial_doOpen() {
    var port = document.getElementById("SelectComPort").value;
    var baud = parseInt(document.getElementById("SelectBandrate").value);

    var SerialPort = require('serialport');
    serial = new SerialPort(port, { baudRate: baud, autoOpen: false });
    serial.on('error', onSerialError);
    serial.on('open', onSerialOpen);
    serial.on('data', onSerialData);
    //serial.on('disconnect',);
    serial.on('close', onSerialClose);
    serial.open();
}

function serial_open() {
    var port = document.getElementById("SelectComPort").value;
    var baud = parseInt(document.getElementById("SelectBandrate").value);

    if (serial) {
        if (serial.path == port) {
            serial.update({ baudRate: baud });
        } else {
            serial.close(serial_doOpen);
        }
    } else {
        serial_doOpen();
    }
}
function serial_update() {
    if (!serial) return;
    var baud = parseInt(document.getElementById("SelectBandrate").value);
    serial.update({ baudRate: baud });
}
function serial_close() {
    serial.close();
}
function serial_send(data) {
    if (!serial) return;
    serial.write(data);
}
function serial_resetUno() {
    if (!serial) return;
    function resetdtr() {
        serial.set({ dtr: true });
    }

    serial.set({ dtr: false }, function () {
        setTimeout(resetdtr, 50);
    });
}

function getTmpDir() {
    var tmpdir = window.localStorage.tmpdir;
    const fs = require('fs');
    try {
        fs.accessSync(tmpdir + '/buildpath');
        fs.accessSync(tmpdir + '/sketch');
    } catch (e) {
        tmpdir = null;
    }
    if (!tmpdir) {
        const os = require('os');
        var t = os.tmpdir();
        tmpdir = fs.mkdtempSync(t + '/osepp-');
        fs.mkdirSync(tmpdir + '/buildpath');
        fs.mkdirSync(tmpdir + '/sketch');
        window.localStorage.tmpdir = tmpdir;
    }
    return tmpdir;
}


var doupload = function (code, callback) {
    //Compiling,msg||err_msg
    //Uploading,msg||err_msg
    //done,[errmsg]

    var arduinoPath = window.localStorage.arduinoPath;
    var portPath = document.getElementById("SelectComPort").value;

    if (!arduinoPath) {
        callback('done', 'Invalid Arduino Path');
        return;
    }
    if (!portPath) {
        callback('done', 'Invalid port');
        return;
    }

    var tmpdir = getTmpDir();

    try {
        const fs = require('fs');

        fs.writeFileSync(tmpdir + '/sketch/sketch.ino', code);
        var builder = '"' + arduinoPath + '/arduino-builder"';
        var argHardware = '-hardware "' + arduinoPath + '/hardware"';
        var argTools = '-tools "' + arduinoPath + '/hardware/tools/avr"';
        var argcFlag = '-tools "' + arduinoPath + '/tools-builder"'
        var argLibraries = '-libraries "' + arduinoPath + '/libraries"';
        var argFlag = '-fqbn arduino:avr:uno';
        var argFile = '"' + tmpdir + '/sketch/sketch.ino"';
        var argBuildPath = '-build-path "' + tmpdir + '/buildpath"';

        const spawn = require('child_process').spawn;
        const genhex = spawn(builder, [argHardware, argTools, argcFlag, argLibraries, argFlag, argBuildPath, argFile], { shell: true });

        genhex.stdout.on('data', (data) => {
            callback("Compiling", data);
        });
        genhex.stderr.on('data', (data) => {
            callback("Compiling", data);
        });
        genhex.on('close', (exitcode) => {
            if (exitcode == 0) {
                try {
                    var app = '"' + arduinoPath + '/hardware/tools/avr/bin/avrdude"';
                    var argConf = '-C"' + arduinoPath + '/hardware/tools/avr/etc/avrdude.conf"';

                    var argCpu = '-patmega328p -carduino -D';

                    var argPort = '-P"' + portPath + '"';
                    var argBaud = '-b115200';

                    var argFile = '-Uflash:w:"' + tmpdir + '/buildpath/sketch.ino.hex' + '":i';

                    const spawn = require('child_process').spawn;
                    const upload = spawn(app, [argConf, argCpu, argFile, argPort, argBaud, ' -q'], { shell: true });
                    upload.stdout.on('data', (data) => {
                        callback("Uploading", data);
                    });
                    upload.stderr.on('data', (data) => {
                        callback("Uploading", data);
                    });
                    upload.on('close', (exitcode) => {
                        callback('done');
                    });
                } catch (e) {
                    callback("done", 'unknow error:avrdude');
                    return;
                }
            } else {
                callback("done", 'unknow error:Compiling');
            }
        });
    } catch (e) {
        callback('done', 'unknow error:uploading');
        return;
    }
}

var genhex = function (code, callback) {
    //Compiling,msg||err_msg
    //done,[errmsg]

    var arduinoPath = window.localStorage.arduinoPath;

    if (!arduinoPath) {
        callback('done', 'Invalid Arduino Path');
        return;
    }

    var tmpdir = getTmpDir();

    try {
        const fs = require('fs');

        fs.writeFileSync(tmpdir + '/sketch/sketch.ino', code);
        var builder = '"' + arduinoPath + '/arduino-builder"';
        var argHardware = '-hardware "' + arduinoPath + '/hardware"';
        var argTools = '-tools "' + arduinoPath + '/hardware/tools/avr"';
        var argcFlag = '-tools "' + arduinoPath + '/tools-builder"'
        var argLibraries = '-libraries "' + arduinoPath + '/libraries"';
        var argFlag = '-fqbn arduino:avr:uno';
        var argFile = '"' + tmpdir + '/sketch/sketch.ino"';
        var argBuildPath = '-build-path "' + tmpdir + '/buildpath"';

        const spawn = require('child_process').spawn;
        const genhex = spawn(builder, [argHardware, argTools, argcFlag, argLibraries, argFlag, argBuildPath, argFile], { shell: true });
        callback("Compiling", "Compiling\n");
        genhex.stdout.on('data', (data) => {
            callback("Compiling", data);
        });
        genhex.stderr.on('data', (data) => {
            callback("Compiling", data);
        });
        genhex.on('close', (exitcode) => {
            callback("done", 'done');
        });
    } catch (e) {
        callback('done', 'unknow error:uploading');
        return;
    }
}



function serial_upload(code, callback) {
    if (!callback) {
        var callback = console.log;
    }

    if (serial) {
        var reconnect = function (state, msg) {
            callback(state, msg);
            if (state == "done") {
                serial_open();
            }
        }
        serial.close(doupload.bind(this, code, reconnect));
    } else {
        doupload(code, callback);
    }
}

function opendialog() {

    const remote = require('electron').remote;
    const dialog = remote.dialog;

    var file = dialog.showOpenDialog({ title: 'Select arduino path', properties: ['openFile'] });
    if (file) {
        file = file[0];

        const path = require('path');
        var extName = path.extname(file);
        if (extName == '.app') {
            window.localStorage.arduinoPath = path.join(file, 'Contents', 'Java');
        } else {
            window.localStorage.arduinoPath = path.dirname(file);
        }
        document.getElementById("msgTextArea").innerHTML += '<br>You have set the path to Arduino:' + file;
        document.getElementById("msgTextArea").innerHTML += '<br>Try upload again!<br>';
    }
}


function verifyArduinoPath(path) {
    const fs = require('fs');
    var existBuilder = fs.existsSync(path + '/arduino-builder') ||
        fs.existsSync(path + '/arduino-builder.exe');
    var existAvrdude = fs.existsSync(path + '/hardware/tools/avr/bin/avrdude') ||
        fs.existsSync(path + '/hardware/tools/avr/bin/avrdude.exe');
    var ok = existAvrdude && existBuilder;
    return ok;
}


function getArduinoPath() {
    const fs = require('fs');
    const path = require('path');

    var arduinoPath = window.localStorage.arduinoPath;
    if (!verifyArduinoPath(arduinoPath)) {
        arduinoPath = '';
        try {
            const {app} = require('electron').remote;
            var curPath = path.resolve(app.getPath('exe'));
            curPath = path.dirname(curPath);
            if (process.platform == 'darwin') {
                curPath = path.resolve(curPath, '..', '..', '..');
            }
            var files = fs.readdirSync(curPath);
            for (var fn, i = 0; fn = files[i]; i++) {
                if (fn.toLowerCase().indexOf('arduino') < 0) continue;
                var fp = path.join(curPath, fn);
                var st = fs.statSync(fp);
                if (st.isDirectory()) {
                    if (verifyArduinoPath(fp)) {
                        arduinoPath = fp;
                        window.localStorage.arduinoPath = arduinoPath;
                        break;
                    } else if (verifyArduinoPath(path.join(fp, 'Contents', 'Java'))){
                        arduinoPath = path.join(fp, 'Contents', 'Java');
                        window.localStorage.arduinoPath = arduinoPath;
                        break;
                    }
                }
            }
        } catch (e) {
            arduinoPath = '';
        }
    }

    if (!arduinoPath) {
        var setArduinoPathMsg = function () {
            //show up msg div
            document.getElementById("serial_upload_msg").setAttribute('class', 'serial_upload_msg_open');
            document.getElementById("msgTextArea").innerHTML = 'You have not set the path to Arduino IDE, <a href="#" onclick="opendialog()">click here</a>  to set it up!';
            document.getElementById("msgTextArea").innerHTML += '<br>For Windows systems,should select arduino.exe<br>For MacOS systems,should select arduino.app';
        }
        if (serial) {
            serial.close(setArduinoPathMsg);
        } else {
            setArduinoPathMsg();
        }
        throw 'noarduinopath';
    }
    return arduinoPath;
}

function loadOBPFileFromCLI() {
    var text = null;
    try {
        const remote = require('electron').remote;
        const fs = require('fs');
        const path = require('path');
        var args = remote.process.argv.slice(1);
        for (var fname, i = 0; fname = args[i]; i++) {
            if (path.extname(fname).toLowerCase() != ".obp") continue;
            if (!fs.existsSync(fname)) continue;
            text = fs.readFileSync(fname, 'utf-8');
            break;
        }
    }
    catch (e) {
        text = null;
    }
    return text;
}




var initSerialUI = function () {
    try {
        require('serialport');//no serial,goto catch
        initSelectPort();
        initSelectBaud();
        document.getElementById("connect").onclick = function () {
            if (serial) {
                serial_close();
            } else {
                serial_open();
            }
        }
        document.getElementById("reset").onclick = serial_resetUno;

        document.getElementById("send").onclick = function () {
            var text = document.getElementById("sendtext").value;
            var line_ending = document.getElementById("line_ending").value;
            if (!text) return;
            switch (line_ending) {
                case 'Newline':
                    text += '\n';
                    break;
                case 'Carriage return':
                    text += '\r';
                    break;
                case 'Both NL&CR':
                    text += '\n\r';
            }
            serial_send(text);
            document.getElementById("sendtext").focus();
            document.getElementById("sendtext").select();
        }
        document.getElementById("sendtext").onkeypress = function (event) {
            if (event.keyCode == 13) {
                document.getElementById("send").onclick();
            }
        }
        document.getElementById("toggle_serial_box").onclick = function () {
            var el = document.getElementById("serial_upload_msg");
            var now = el.getAttribute('class');
            if (now == "serial_upload_msg_close") el.setAttribute('class', 'serial_upload_msg_open'); else el.setAttribute('class', 'serial_upload_msg_close');
        }
        document.getElementById("verify").onclick = function () {
            delClass('serial_upload_msg', 'serial_upload_msg_close');
            addClass('serial_upload_msg', 'serial_upload_msg_open');
            try {
                getArduinoPath();//check arduino path
                genhex(getCode(), function (state, msg) {
                    if (msg) {
                        var el = document.getElementById("msgTextArea");
                        var chile = document.createElement('span');
                        chile.innerText = msg + '\n';
                        el.appendChild(chile);
                        el.scrollTop = el.scrollHeight;
                    }
                });
            } catch (e) {

            }
        };
        document.getElementById("send_to_arduino_ide").onclick = function () {
            document.getElementById("msgTextArea").innerText = '';
            document.getElementById("serial_upload_msg").setAttribute('class', 'serial_upload_msg_open');
            try {
                var arduinoPath = getArduinoPath();
                try {
                    const fs = require('fs');
                    const path = require('path');
                    function writeFile() {
                        var tmpDir = getTmpDir();
                        tmpDir = fs.mkdtempSync(tmpDir + '/unname');
                        var filename = path.basename(tmpDir);
                        filename = tmpDir + '/' + filename + '.ino';
                        fs.writeFileSync(filename, getCode());
                        return filename;
                    }
                    if (fs.existsSync(arduinoPath + '/arduino_debug.exe')) {
                        const spawn = require('child_process').spawn;
                        var f = writeFile();
                        const ide = spawn('"' + arduinoPath + '/arduino_debug"', ['"' + f + '"'], { shell: true });
                    } else if (fs.existsSync(path.join(arduinoPath, '/..', '/MacOS/Arduino'))) {
                        const spawn = require('child_process').spawn;
                        var f = writeFile();
                        const ide = spawn('"' + path.join(arduinoPath, '/..', '/MacOS/Arduino') + '"', ['"' + f + '"'], { shell: true });
                    } else if (fs.existsSync(arduinoPath + '/arduino')) {
                        const spawn = require('child_process').spawn;
                        var f = writeFile();
                        const ide = spawn('"' + path.join(arduinoPath, '/arduino') + '"', ['"' + f + '"'], { shell: true });
                    } else {
                        throw 'Invalid Arduino Path';
                    }
                    var el = document.getElementById("msgTextArea");
                    var chile = document.createElement('span');
                    chile.innerText = "Arduino IDE is starting, please wait a moment!\n";
                    el.appendChild(chile);
                    el.scrollTop = el.scrollHeight;

                } catch (e) {
                    var el = document.getElementById("msgTextArea");
                    var chile = document.createElement('span');
                    chile.innerText = "Failed to send code to arduino IDE\n";
                    el.appendChild(chile);
                    el.scrollTop = el.scrollHeight;
                }
            } catch (e) {

            }
        };

        document.getElementById("upload").onclick = uploadClick;

        document.getElementById("serial_upload_msg").style.display = 'block';
        document.getElementById("code_menu").style.display = 'block';
        document.getElementById("footView").style.display = 'block';
        document.getElementById("blocklyarea").style = '';

    } catch (e) {

    }
}


var getOnlineVersionNumber = function (callback) {
    const {net} = require('electron').remote;
    const request = net.request('http://www.osepp.com/block/package.json?d=' + Date());
    request.on('response', (response) => {
        if (response.statusCode == 200) {
            response.on('data', (chunk) => {
                var json = JSON.parse(chunk);
                if (json.version) {
                    if (callback) {
                        callback(json.version);
                    }
                }
            })
        }
    });
    request.on('error', (error) => {
        //console.log(error);
    });
    request.end();
}
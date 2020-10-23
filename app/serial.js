"use strict";

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

var msgTextAreaHeight = 300;
let msgpipe = null;

function msgpipi_on_open() {
    $("#connect").removeClass("svg_disable");
    $("#send,#reset,#sendtext,#line_ending").show();
    $("#serial_upload_msg").height(msgTextAreaHeight);
}
function msgpipi_on_close() {
    $('#connect').addClass("svg_disable");
    $("#send,#reset,#sendtext,#line_ending").hide();
    msgpipe = null;
}
function msgpipi_on_data(data) {
    logmsg(data);
}

function isIP(port) {
    let ns = port.split('.').map(s => parseInt(s)).filter(n => !isNaN(n) && n >= 0 && n <= 255);
    return ns.length === 4;
}

let querystrIP = location.search.split('&')
    .map(s => s.match(/ip=(.+)/))
    .filter(m => m)
    .map(m => m[1])
    .filter(ip => isIP(ip))
    .map(ip => ({ type: 'ws', value: ip }));


function websocks_msg_pipe(port, rate, onOpen, onData, onClose) {
    return new Promise((resolve, reject) => {
        let closeHook = null;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://' + port + '/getbaudrate?baudrate=' + rate);
        xhr.onload = () => {
            let socket = new WebSocket('ws://' + port + ':81/', ['arduino']);
            socket.onopen = () => {
                onOpen();
                resolve({
                    close: () => {
                        return new Promise((r, j) => {
                            if (closeHook) return j();
                            closeHook = r;
                            socket.close();
                        });
                    },
                    write: (data) => {
                        socket.send(data);
                    },
                    reset: () => {
                        return new Promise((r, j) => {
                            var xhr1 = new XMLHttpRequest();
                            xhr1.open('POST', 'http://' + port + '/log/reset');
                            xhr1.onload = r;
                            xhr1.onerror = j;
                            xhr1.send();
                        })
                    }
                });
            };
            socket.onmessage = (event) => {
                var reader = new FileReader();
                reader.onload = () => {
                    onData(new Uint8Array(reader.result));
                }
                reader.readAsArrayBuffer(event.data);
            };
            socket.onerror = socket.onclose = (e) => {
                onClose();
                if (closeHook) closeHook();
            }
        };
        xhr.onerror = reject;
        xhr.send();
    })
}

function msgpipi_open(port, rate, onOpen, onData, onClose) {
    if (isIP(port)) {
        return websocks_msg_pipe(port, rate, onOpen, onData, onClose);
    }
    return window.electronPort.SerialPort(port, rate, onOpen, onData, onClose);
}

function initSerialUI() {
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
                if (msgpipe) {
                    msgpipe.close().then(() => $('#connect').click())
                }
            }
        } catch (e) {
            console.log(e);
        }
    }).val(window.localStorage.baudrate || "115200");

    $("#SelectComPort").autocomplete({
        source: function (request, response) {
            if (window.electronPort) {
                window.electronPort.ListPorts().then(r => response(r.concat(querystrIP)))
            } else {
                response(querystrIP);
            }
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
                if (msgpipe) {
                    msgpipe.close().then(() => $('#connect').click())
                }
            }
        } catch (e) {
            console.log(e);
        }
    }).val(window.localStorage.port || "");

    $('#connect').click(function () {
        if (msgpipe) {
            msgpipe.close();
        } else {
            var port = $('#SelectComPort').val();
            var baud = parseInt($("#SelectBandrate").val());
            msgpipi_open(port, baud, msgpipi_on_open, msgpipi_on_data, msgpipi_on_close).then(pp => msgpipe = pp);
        }
    });

    $('#reset').click(function () {
        if (msgpipe) msgpipe.reset();
    });

    $('#send').click(function () {
        if (!msgpipe) return;
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
        msgpipe.write(text);
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

    if (window.electronPort || querystrIP.length) {
        $('#serial_upload_msg,#code_menu,#footView').show();
        $('#blocklyarea').css('bottom', '');//remove bottom:0

    } else {
        $('#serial_upload_msg,#code_menu,#footView').hide();
        $('#blocklyarea').css('bottom', '0');//remove bottom:0
    }
}

$(document).ready(initSerialUI);


let compile = null;
let upload = null;

function arduino_ui() {
    if (upload) {
        $('#upload').addClass("svg_acting");
    } else {
        $('#upload').removeClass("svg_acting");
    }
    if (compile) {
        $('#verify').addClass("svg_acting");
    } else {
        $('#verify').removeClass("svg_acting");
    }
}

function arduino_handle(state, msg) {
    if (state === 'start') {
        arduino_ui();
    } else if (state === 'error' || state == 'done') {
        arduino_ui();
        // setTimeout(() => {
        //     $('#msgUpload').dialog('close');
        // }, 3000);
    } else if (state === 'message' || state === 'stdout' || state === 'stderr') {
        $('#msgUpload').append('<span>' + msg + '</span><br/>');
    }
}

function ip_upload(port) {
    return new Promise((resolve, reject) => {

        upload = window.electronPort.uploader(getCode(), port, (state, msg) => {
            arduino_handle(state, msg);
            if (state === 'done' || state == 'error') {
                upload = null;
                arduino_ui();
            }
        }).finally(() => upload = null)

        window.ipcRenderer.on('arduino', (event, state, msg) => {
            if (state === 'done') {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'http://' + port + '/upload?baudrateisp=115200');
                xhr.onload = () => {
                    arduino_handle('message', xhr.responseText);
                    arduino_handle('done');
                    xhr.status === 200 ? resolve() : reject();
                    window.ipcRenderer.removeAllListeners('arduino');
                }
                xhr.onerror = () => {
                    arduino_handle('message', 'network error');
                    arduino_handle('done');
                    reject();
                }
                xhr.send(msg);
            } else {
                arduino_handle(state, msg);
                if (state == 'error') {
                    window.ipcRenderer.removeAllListeners('arduino');
                    reject();
                }
            }
        });
        window.ipcRenderer.send('arduino-compile', getCode());
    })
}

function doUpload() {
    if (upload || compile) return;
    var port = $('#SelectComPort').val();
    $('#msgUpload').empty().dialog({ width: 640, height: 600, title: Blockly.Msg['upload'], closeOnEscape: true });
    if (isIP(port)) {
        upload = window.electronPort.compiler(getCode(), (state, msg) => {
            arduino_handle(state, msg);
            if (state === 'done' || state == 'error') {
                arduino_ui();
            }
        }).then(hexcode => new Promise((resolve, reject) => {
            arduino_handle('message', 'uploading');
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://' + port + '/upload?baudrateisp=115200');
            xhr.onload = () => {
                arduino_handle('message', xhr.responseText);
                arduino_handle('done');
                xhr.status === 200 ? resolve() : reject();
            }
            xhr.onerror = () => {
                arduino_handle('message', 'network error');
                reject();
            }
            xhr.send(hexcode);
        })).catch(e => {
            if (e) arduino_handle('message', e);
        }).finally(() => {
            upload = null;
            arduino_ui();
        })
    } else {
        let reOpen = msgpipe ? true : false;
        let u = () => {
            upload = window.electronPort.uploader(getCode(), port, (state, msg) => {
                arduino_handle(state, msg);
                if (state === 'done' || state == 'error') {
                    if (reOpen) $('#connect').click();
                }
            }).catch(e => {
                if (e) arduino_handle('message', e);
            }).finally(() => {
                upload = null;
                arduino_ui();
            })
        }
        if (msgpipe) {
            msgpipe.close().then(u)
        } else {
            u();
        }
    }
}

function doVerify() {
    if (upload || compile) return;
    $('#msgUpload').empty().dialog({ width: 640, height: 400, title: Blockly.Msg['verifycode'], closeOnEscape: true });
    compile = window.electronPort.compiler(getCode(), (state, msg) => {
        arduino_handle(state, msg);
        if (state === 'done' || state == 'error') {
            compile = null;
            arduino_ui();
        }
    }).catch(e => {
        if (e) arduino_handle('message', e);
    }).finally(() => compile = null);
}

function initUploadUI() {
    $("#verify").click(doVerify);

    $('#upload').click(doUpload);

    if (window.electronPort) {
        $('#upload').show();
        $("#verify").show();
    } else {
        $("#verify").hide();
        $('#upload').hide();
    }
}

$(document).ready(initUploadUI);

window.addEventListener('beforeunload', function () {
    if (msgpipe) msgpipe.close();
    if (window.electronPort) {
        window.electronPort.Cleanup.forEach(f => f());
    }
});
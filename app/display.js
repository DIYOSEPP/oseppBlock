'use strict';

var blockWorkspace = null;
var codeChanged = false;


var curwidth = 300;
function resizeWorkspaceDiv() {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    var blocklyarea = document.getElementById("blocklyarea");
    var blocklyDiv = document.getElementById("blockly_div");
    var codearea = document.getElementById("codediv");
    var x = 0;
    var y = 0;
    var element = blocklyarea;
    do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    } while (element);

    if (curwidth < 100) curwidth = 10;

    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = (blocklyarea.offsetWidth - curwidth) + 'px';
    blocklyDiv.style.height = blocklyarea.offsetHeight + 'px';
    codearea.style.width = curwidth + 'px';
    if (blockWorkspace) {
        Blockly.svgResize(blockWorkspace);
    }
};
var slider_drogStart = function (e) {
    var ev = e || event;
    if (ev.preventDefault) {
        ev.preventDefault();
        ev.stopPropagation();
    }

    ev = ev.type == "touchstart" ? ev.targetTouches[0] : ev;

    var disX = ev.clientX;
    var codediv = document.getElementById("codediv");
    var width = codediv.style.width;
    width = parseInt(width);

    var slidermove = function (e) {
        var ev = e || event;
        if (ev.preventDefault) {
            ev.preventDefault();
            ev.stopPropagation();
        }

        ev = ev.type == 'touchmove' ? ev.targetTouches[0] : ev;
        var dx = (ev.clientX - disX);
        curwidth = width - dx;
        resizeWorkspaceDiv();
        return false;
    };
    document.addEventListener('mousemove', slidermove, false);
    document.addEventListener('touchmove', slidermove, false);
    var sliderup = function (e) {
        var ev = e || event;
        if (ev.preventDefault) {
            ev.preventDefault();
            ev.stopPropagation();
        }
        document.removeEventListener('mousemove', slidermove, false);
        document.removeEventListener('mouseup', sliderup);
        document.removeEventListener('touchmove', slidermove, false);
        document.removeEventListener('touchend', sliderup, false);
        resizeWorkspaceDiv();
        return false;
    }
    document.addEventListener('mouseup', sliderup, false);
    document.addEventListener('touchend', sliderup, false);
    return false;
}




function saveBlockWorkspaceToLocalStorage(workspace) {
    if (Blockly.getMainWorkspace().isDragging()) return;
    try {
        if (!!window.localStorage) {
            var xml = Blockly.Xml.workspaceToDom(workspace);
            var text = Blockly.Xml.domToText(xml);
            window.localStorage.blocks = text;
        }
    } catch (e) {
    }
}
function loadBlockWorkspaceFromLocalStorage(workspace) {
    var text = null;
    try {
        text = loadOBPFileFromCLI();
    }
    catch (e) {
        text = null;
    }

    try {
        if (text == null) {
            text = window.localStorage.blocks;
        }
    } catch (e) {
        // Firefox sometimes throws a SecurityError when accessing sessionStorage.
        // Restarting Firefox fixes this, so it looks like a bug.
        text = null;
    }
    if (text) {
        try {
            var xml = Blockly.Xml.textToDom(text);
            Blockly.Xml.domToWorkspace(xml, workspace);
            return true;
        } catch (e) {
            workspace.clear();
            return false;
        }
    } else {
        return false;
    }
}
var newWorkspace = function () {
    var blocks = blockWorkspace.getAllBlocks();
    var eventGroup = Blockly.utils.genUid();
    Blockly.Events.setGroup(eventGroup);
    blockWorkspace.clear();
    var block = blockWorkspace.newBlock('controlsetuploop');
    block.initSvg();
    block.render();
    block.setDeletable(false);
    blockWorkspace.scrollCenter();
    Blockly.Events.setGroup(false);
}

var saveWorkspace = function () {
    try {
        var filename = prompt('Enter the file name under which to save your blocks ', 'oseppBlocks.obp');
    } catch (e) {
        var filename = 'oseppBlock.obp';
    }

    if (filename) {
        var xml = Blockly.Xml.workspaceToDom(blockWorkspace);
        var text = Blockly.Xml.domToText(xml);
        var data = new Blob([text], { type: 'text/xml' });
        var clickEvent = new MouseEvent("click", {
            "view": window,
            "bubbles": true,
            "cancelable": false
        });

        var a = document.createElement('a');
        a.href = window.URL.createObjectURL(data);
        a.download = filename;
        a.textContent = 'Download file!';
        a.dispatchEvent(clickEvent);
    }
}
var loadWorkspace = function () {
    var f = document.createElement('input');
    f.setAttribute('type', 'file')
    f.setAttribute('id', 'load_block_file');
    f.setAttribute('accept', ".obp");

    f.onchange = function () {
        var file = this.files[0];
        var reader = new FileReader();
        reader.onload = function () {
            try {
                var text = reader.result;
                var xml = Blockly.Xml.textToDom(text);
                blockWorkspace.clear();
                Blockly.Xml.domToWorkspace(xml, blockWorkspace);
                blockWorkspace.scrollCenter();
                blockWorkspace.clearUndo();
            } catch (e) {
                newWorkspace();
            }
        }
        reader.readAsText(file);
    }
    var clickEvent = new MouseEvent("click", {
        "view": window,
        "bubbles": true,
        "cancelable": false
    });

    f.dispatchEvent(clickEvent);
}

function createBlockWorkspace() {
    blockWorkspace = Blockly.inject(document.getElementById("blockly_div"),
        {
            comments: true,
            disable: false,
            collapse: false,
            media: 'scratch-blocks/media/',
            readOnly: false,
            scrollbars: true,
            toolbox: Blockly.Xml.textToDom(blockToolboxXml),
            toolboxPosition: 'start',
            sounds: 'true',
            zoom: {
                controls: true,
                wheel: true,
                startScale: 0.75,
                maxScale: 4,
                minScale: 0.25,
                scaleSpeed: 1.1
            }
        });
    if (!loadBlockWorkspaceFromLocalStorage(blockWorkspace)) {
        var block = blockWorkspace.newBlock('controlsetuploop');
        block.initSvg();
        block.render();
        block.setDeletable(false);
    }
    blockWorkspace.setScale(blockWorkspace.options.zoomOptions.startScale);
    blockWorkspace.scrollCenter();
    blockWorkspace.clearUndo();
    blockWorkspace.addChangeListener(
        function blockWorkspaceChanged(masterEvent) {
            if (masterEvent.type == Blockly.Events.UI) {
                return;  // Don't update UI events.
            }
            saveBlockWorkspaceToLocalStorage(blockWorkspace);
            codeChanged = true;
        });
    codeChanged = true;
}

var curTab = '';
function showHardwareWorkspace() {
    if (curTab != 'hardware') {
        blockWorkspace.updateToolbox(hardwareToolboxXml);
        resizeWorkspaceDiv();
        curTab = 'hardware';
    }
}

function showBlockWorkspace() {
    if (curTab != 'block') {
        blockWorkspace.updateToolbox(blockToolboxXml);
        resizeWorkspaceDiv();
        curTab = 'block';
    }
}

function getCode() {
    return Blockly.Arduino.workspaceToCode(blockWorkspace) || '';
}

function updateCode() {
    if (!codeChanged) return;
    if (Blockly.getMainWorkspace().isDragging()) return;
    var allcode = getCode() || '';
    allcode = allcode.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    document.getElementById('code_area').innerHTML = prettyPrintOne(allcode, 'cpp', false);
    codeChanged = false;
}



var savePortName = function () {
    var select = this;
    if (!select) return;
    var port = select.options[select.selectedIndex];
    try {
        if (port) window.localStorage.port = port.value;
        if (serial) serial_open();
    } catch (e) {

    }
}
function initSelectPort() {
    var select = document.getElementById("SelectComPort");
    select.options.length = 0;
    select.addEventListener('mousedown', fillPortList, false);
    select.onmousedown = fillPortList;
    try {
        if (!!window.localStorage) {
            var port = window.localStorage.port;
            if (port) {
                select.add(new Option(port, port));
                select.selectedIndex = 0;
            }
        }
    } catch (e) {
    }
    select.onmousedown();
    select.onchange = savePortName;
}
var saveBaudrate = function () {
    var select = this;
    if (!select) return;
    var port = select.options[select.selectedIndex];
    try {
        if (port) window.localStorage.baudrate = port.value;
        serial_update();
    } catch (e) {

    }
}
function initSelectBaud() {
    var select = document.getElementById("SelectBandrate");

    try {
        var baudrate = window.localStorage.baudrate;
        if (baudrate) {
            for (var i = 0; i < select.options.length; i++) {
                if (select.options[i].value == baudrate) {
                    select.selectedIndex = i;
                    break;
                }
            }
        }
    } catch (e) {
    }
    select.onchange = saveBaudrate;
}

var uploadClick = function () {
    function lockUI() {
        addClass("upload", 'svg_acting');
        addClass("connect", 'svg_hide');
    }
    function unlockUI() {
        delClass("upload", 'svg_acting');
        delClass("connect", 'svg_hide');
    }
    lockUI();
    try {
        getArduinoPath();//check arduino path
        document.getElementById("msgTextArea").innerText = '';
        document.getElementById("serial_upload_msg").setAttribute('class', 'serial_upload_msg_open');
        serial_upload(getCode(), function (state, msg) {
            if (msg) {
                var el = document.getElementById("msgTextArea");
                var chile = document.createElement('span');
                chile.innerText = msg + '\n';
                el.appendChild(chile);
                el.scrollTop = el.scrollHeight;
            }
            if (state == 'done') {
                unlockUI();
            }
        });
    } catch (e) {
        unlockUI()
    }
}


function initWorkspace() {
    try {
        genToolboxXml();
    } catch (e) {

    }
    resizeWorkspaceDiv();
    createBlockWorkspace();
    resizeWorkspaceDiv();
    window.addEventListener('resize', resizeWorkspaceDiv, false);

    document.getElementById("silderdiv").addEventListener('mousedown', slider_drogStart, false);
    document.getElementById("silderdiv").addEventListener('touchstart', slider_drogStart, false);
    setInterval("updateCode()", 250);

    document.getElementById("hardware").onclick = showHardwareWorkspace;
    document.getElementById("block").onclick = showBlockWorkspace;

    document.getElementById("new").onclick = newWorkspace;
    document.getElementById("save").onclick = saveWorkspace;
    document.getElementById("load").onclick = loadWorkspace;

    document.getElementById("undo").onclick = function () {
        Blockly.getMainWorkspace().undo(0);
    }
    document.getElementById("redo").onclick = function () {
        Blockly.getMainWorkspace().undo(1);
    }
    try {
        if (initSerialUI !== undefined) {
            initSerialUI();
            resizeWorkspaceDiv();
        }
    } catch (e) {
    }
    document.ondragover = function (e) {
        e.preventDefault();
        //return false;
    }
    document.ondrop = function (e) {
        e.preventDefault();
        //return false;
        var list = e.dataTransfer.files;
        for (var i = 0; i < list.length; i++) {
            var f = list[i];
            if (!f.name.toLowerCase().endsWith(".obp")) continue;
            var reader = new FileReader();
            reader.onload = function () {
                try {
                    var text = reader.result;
                    var xml = Blockly.Xml.textToDom(text);
                    blockWorkspace.clear();
                    Blockly.Xml.domToWorkspace(xml, blockWorkspace);
                    blockWorkspace.scrollCenter();
                } catch (e) {
                    newWorkspace();
                }
            }
            reader.readAsText(f);
            break;
        }
    }
    try {
        getOnlineVersionNumber(function (version) {
            var cv = document.title;
            if (version) {
                version = String(version).replace(/(^\s*)|(\s*$)/g, '');
                if ((version != '') && (cv.indexOf(version) < 0)) {
                    //show up msg div
                    document.getElementById("serial_upload_msg").setAttribute('class', 'serial_upload_msg_open');
                    document.getElementById("msgTextArea").innerHTML += '<br><a href="https://osepp.com/oseppblock-ide">new version oseppBlock ' + version +' available!</a><br>';
                }  
            }
        });
    } catch (e) {

    }
}


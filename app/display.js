"use strict";

var blockWorkspace = null;
var codeChanged = false;
var curwidth = 300;

var localobpname = "";

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

    blocklyDiv.style.left = x + "px";
    blocklyDiv.style.top = y + "px";
    blocklyDiv.style.width = (blocklyarea.offsetWidth - curwidth) + "px";
    blocklyDiv.style.height = blocklyarea.offsetHeight + "px";
    codearea.style.width = curwidth + "px";
    if (blockWorkspace) {
        Blockly.svgResize(blockWorkspace);
    }
    try {
        window.localStorage.codeWidth = curwidth;
    } catch (e) {

    }
}
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

        ev = ev.type == "touchmove" ? ev.targetTouches[0] : ev;
        var dx = (ev.clientX - disX);
        curwidth = width - dx;
        resizeWorkspaceDiv();
        return false;
    };
    document.addEventListener("mousemove", slidermove, false);
    document.addEventListener("touchmove", slidermove, false);
    var sliderup = function (e) {
        var ev = e || event;
        if (ev.preventDefault) {
            ev.preventDefault();
            ev.stopPropagation();
        }
        document.removeEventListener("mousemove", slidermove, false);
        document.removeEventListener("mouseup", sliderup);
        document.removeEventListener("touchmove", slidermove, false);
        document.removeEventListener("touchend", sliderup, false);
        resizeWorkspaceDiv();
        return false;
    };
    document.addEventListener("mouseup", sliderup, false);
    document.addEventListener("touchend", sliderup, false);
    return false;
}

function loadOBPFileFromCLI() {
    var text = null;
    try {
        const remote = require("electron").remote;
        const fs = require("fs");
        const path = require("path");
        var args = remote.process.argv.slice(1);
        for (var fname, i = 0; fname = args[i]; i++) {
            if (path.extname(fname).toLowerCase() != ".obp") continue;
            if (!fs.existsSync(fname)) continue;
            text = fs.readFileSync(fname, "utf-8");
            localobpname = path.basename(fname);
            break;
        }
    }
    catch (e) {
        text = null;
    }
    return text;
}

function saveBlockWorkspaceToLocalStorage(workspace) {
    if (Blockly.getMainWorkspace().isDragging()) return;
    try {
        if (window.localStorage) {
            var xml = Blockly.Xml.workspaceToDom(workspace);
            var text = Blockly.Xml.domToText(xml);
            window.localStorage.blocks = text;
        }
    } catch (e) {
        console.log(e);
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
    var eventGroup = Blockly.utils.genUid();
    Blockly.Events.setGroup(eventGroup);
    blockWorkspace.clear();
    var block = blockWorkspace.newBlock("controlsetuploop");
    block.initSvg();
    block.render();
    block.setDeletable(false);
    blockWorkspace.scrollCenter();
    Blockly.Events.setGroup(false);
    localobpname = "";
}

var dateStr = function () {
    var d = new Date();
    var ds = "" + d.getFullYear() + d.getMonth() + d.getDate() + d.getHours() + d.getMinutes() + d.getSeconds();
    return ds;
}

var saveWorkspace = function () {
    var defaultName = "oseppBlocks" + dateStr() + ".obp";
    if (localobpname) defaultName = localobpname;
    try {
        var filename = prompt(Blockly.Msg["saveBlocks"], defaultName);
    } catch (e) {
        var filename = defaultName;
    }

    if (filename) {
        var xml = Blockly.Xml.workspaceToDom(blockWorkspace);
        var text = Blockly.Xml.domToText(xml);
        var data = new Blob([text], { type: "text/obp" });
        var clickEvent = new MouseEvent("click", {
            "view": window,
            "bubbles": true,
            "cancelable": false
        });

        var a = document.createElement("a");
        a.href = window.URL.createObjectURL(data);
        a.download = filename;
        a.textContent = "Download file!";
        a.dispatchEvent(clickEvent);
    }
}
var saveINO = function () {
    var defaultName = "sketch" + dateStr() + ".ino";
    if (localobpname) defaultName = localobpname.replace(/obp$/, "ino");
    try {
        var filename = prompt(Blockly.Msg["saveINO"], defaultName);
    } catch (e) {
        var filename = defaultName;
    }

    if (filename) {
        var text = getCode() || 'void setup(){\n}\n\nvoid loop(){\n}';
        var data = new Blob([text], { type: "text/ino" });
        var clickEvent = new MouseEvent("click", {
            "view": window,
            "bubbles": true,
            "cancelable": false
        });

        var a = document.createElement("a");
        a.href = window.URL.createObjectURL(data);
        a.download = filename;
        a.textContent = "Download file!";
        a.dispatchEvent(clickEvent);
    }
}
var loadWorkspace = function () {
    var f = document.createElement("input");
    f.setAttribute("type", "file");
    f.setAttribute("id", "load_block_file");
    f.setAttribute("accept", ".obp");

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
                localobpname = file.name;
            } catch (e) {
                newWorkspace();
            }
        };
        reader.readAsText(file);
    };
    var clickEvent = new MouseEvent("click", {
        "view": window,
        "bubbles": true,
        "cancelable": false
    });

    f.dispatchEvent(clickEvent);
}
function setLocaleUI() {
    var trans = document.querySelectorAll('[localeID]');
    for (var i = 0, t; t = trans[i]; i++) {
        var key = t.attributes.localeID.value;
        if (!Blockly.Msg[key]) continue;
        switch (t.tagName.toLowerCase()) {
            case 'li':
                t.title = Blockly.Msg[key];
                break;
            case 'span':
            case 'option':
                t.innerText = Blockly.Msg[key];
                break;
            default:
                break;
        }
    }
}

function setLocale(locale) {
    blockWorkspace.getFlyout().setRecyclingEnabled(false);
    var xml = Blockly.Xml.workspaceToDom(blockWorkspace);
    Blockly.ScratchMsgs.setLocale(locale);
    Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, blockWorkspace);
    blockWorkspace.updateToolbox(Blockly.Xml.textToDom(blockToolboxXml));
    blockWorkspace.getFlyout().setRecyclingEnabled(true);
    setLocaleUI();
}

function initLocal() {
    try {
        const remote = require("electron").remote;
        var args = remote.process.argv.slice(1);
        var loca_cli = '';
        //last set from cli
        for (var arg, i = 0; arg = args[i]; i++) {
            match = arg.match(/locale=([^&]+)/);
            if (match) loca_cli = match[1];
        }
        if (loca_cli) {
            Blockly.ScratchMsgs.setLocale(match[1]);
            setLocaleUI();
            return;//nowhere to go
        }
    }
    catch (e) {
    }

    var match = location.search.match(/locale=([^&]+)/);
    if (match) {
        Blockly.ScratchMsgs.setLocale(match[1]);
    } else {
        var lang = navigator.language || navigator.userLanguage;
        Blockly.ScratchMsgs.setLocale(lang.toLowerCase());
    }
    setLocaleUI();
}

function createBlockWorkspace() {
    blockWorkspace = Blockly.inject(document.getElementById("blockly_div"),
        {
            comments: true,
            disable: false,
            collapse: false,
            media: "scratch-blocks/media/",
            readOnly: false,
            scrollbars: true,
            toolbox: Blockly.Xml.textToDom(blockToolboxXml),
            toolboxPosition: "start",
            sounds: "true",
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
        var block = blockWorkspace.newBlock("controlsetuploop");
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

function getCode() {
    return Blockly.Arduino.workspaceToCode(blockWorkspace) || "";
}

function updateCode() {
    if (!codeChanged) return;
    if (Blockly.getMainWorkspace().isDragging()) return;
    var allcode = getCode() || "";
    allcode = allcode.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    document.getElementById("code_area").innerHTML = PR.prettyPrintOne(allcode, "cpp", true);
    codeChanged = false;
}

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

function initWorkspace() {
    try {
        curwidth = window.localStorage.codeWidth || 300;
    } catch (e) {
        curwidth = 300;
    }
    initLocal();
    resizeWorkspaceDiv();
    createBlockWorkspace();
    resizeWorkspaceDiv();
    window.addEventListener("resize", resizeWorkspaceDiv, false);

    document.getElementById("silderdiv").addEventListener("mousedown", slider_drogStart, false);
    document.getElementById("silderdiv").addEventListener("touchstart", slider_drogStart, false);
    setInterval("updateCode()", 250);
    document.getElementById("new").onclick = newWorkspace;
    document.getElementById("save").onclick = saveWorkspace;
    document.getElementById("load").onclick = loadWorkspace;

    $('#send_to_arduino_ide').click(saveINO);
    $('#save2png').click(savePNG);


    document.getElementById("undo").onclick = function () {
        Blockly.getMainWorkspace().undo(0);
    }
    document.getElementById("redo").onclick = function () {
        Blockly.getMainWorkspace().undo(1);
    }

    document.ondragover = function (e) {
        e.preventDefault();
        //return false;
    };
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
                    localobpname = f.name;
                } catch (e) {
                    newWorkspace();
                }
            };
            reader.readAsText(f);
            break;
        }
    };
    try {
        getOnlineVersionNumber(function (version) {
            var cv = document.title;
            if (version) {
                version = String(version).replace(/(^\s*)|(\s*$)/g, "");
                if (version != "") {
                    var nowv = cv.replace("oseppBlock", "").replace(/(^\s*)|(\s*$)/g, "").split(".");
                    var webv = version.split(".");
                    for (var i = 0; i < nowv.length; i++) {
                        if (parseInt(webv[i]) == parseInt(nowv[i])) continue;
                        if (parseInt(webv[i]) > parseInt(nowv[i])) {
                            document.getElementById("serial_upload_msg").setAttribute("class", "serial_upload_msg_open");
                            document.getElementById("msgTextArea").innerHTML += "<br><a id=\"downloadoseppBlock\" href=\"#\">new version oseppBlock " + version + " available!</a><br>";
                            const exLinksBtn = document.getElementById('downloadoseppBlock');
                            exLinksBtn.addEventListener('click', function (event) {
                                const shell = require('electron').shell
                                shell.openExternal('https://osepp.com/oseppblock-ide')
                            });
                        }
                        break;
                    }

                }
            }
        });
    } catch (e) {
        console.log(e);
    }
}

$(document).ready(initWorkspace);


function block2svg() {
    var rootsvg = blockWorkspace.svgGroup_.parentNode;

    var blockCanvas = rootsvg.getElementsByClassName('blocklyBlockCanvas')[0];
    var bubbleCanvas = rootsvg.getElementsByClassName('blocklyBubbleCanvas')[0];
    var box1 = blockCanvas.getBBox();
    var box2 = bubbleCanvas.getBBox();
    var offset1 = Blockly.utils.getRelativeXY(blockCanvas);
    var offset2 = Blockly.utils.getRelativeXY(bubbleCanvas);
    box1.x += offset1.x; box1.y += offset1.y;
    box2.x += offset2.x; box2.y += offset2.y;
    if (box2.width <= 0 && box2.height <= 0) box2 = box1;
    var minx = Math.min(box1.x, box2.x);
    var miny = Math.min(box1.y, box2.y);
    var maxx = Math.max(box1.x + box1.width, box2.x + box2.width);
    var maxy = Math.max(box1.y + box1.height, box2.y + box2.height);

    rootsvg = rootsvg.cloneNode(true);
    rootsvg.style.backgroundColor = "transparent";
    let bg=rootsvg.getElementsByClassName('blocklyMainBackground')[0];
    bg.parentNode.removeChild(bg);
    blockCanvas = rootsvg.getElementsByClassName('blocklyBlockCanvas')[0];
    bubbleCanvas = rootsvg.getElementsByClassName('blocklyBubbleCanvas')[0];
    blockCanvas.childNodes.forEach(e => {
        var p = Blockly.utils.getRelativeXY(e); e.setAttribute('transform',
            'translate(' + (p.x - minx + offset1.x) + ',' + (p.y - miny + offset1.y) + ')');
    });
    bubbleCanvas.childNodes.forEach(e => {
        var p = Blockly.utils.getRelativeXY(e); e.setAttribute('transform',
            'translate(' + (p.x - minx + offset2.x) + ',' + (p.y - miny + offset2.y) + ')');
    });

    [...rootsvg.getElementsByClassName('scratchCommentText')].forEach(e => {
        if (e.tagName != 'TEXTAREA') return;
        e.innerHTML = e.value;
    });

    blockCanvas.removeAttribute('transform');
    bubbleCanvas.removeAttribute('transform');
    [...rootsvg.getElementsByClassName("blocklyScrollbarBackground")].forEach(e => e.parentNode.removeChild(e));
    [...rootsvg.getElementsByClassName("blocklyZoom")].forEach(e => e.parentNode.removeChild(e));
    rootsvg.setAttribute('height', Math.round(maxy - miny) + 'px');
    rootsvg.setAttribute('width', Math.round(maxx - minx) + 'px');

    var sty = document.getElementsByTagName('style')[0];
    var styleElement = document.createElementNS("http://www.w3.org/2000/svg", "style");
    styleElement.textContent = sty.innerHTML;
    rootsvg.children[0].appendChild(styleElement);

    var img2base64 = [...rootsvg.getElementsByTagName('image')].map(
        (img) => {
            return new Promise((resolve, reject) => {
                var url = img.href.baseVal;
                window.URL = window.URL || window.webkitURL;
                var xhr = new XMLHttpRequest();
                xhr.open("get", url, true);
                xhr.responseType = "blob";
                xhr.onload = function () {
                    if ((this.status == 200) || (this.status == 0)) {
                        var blob = this.response;
                        let oFileReader = new FileReader();
                        oFileReader.onloadend = function (e) {
                            let base64 = e.target.result;
                            img.href.baseVal = base64;
                            resolve();
                        };
                        oFileReader.readAsDataURL(blob);
                    } else {
                        reject();
                    }
                };
                xhr.onerror = reject;
                xhr.send();
            })
        });
    return new Promise((resolve, reject) => {
        Promise.all(img2base64).then(() => {
            resolve(rootsvg);
        });
    })

    //return rootsvg;
}

function saveSVG() {
    var g = block2svg();
    g.then((svg) => {
        var text = Blockly.Xml.domToText(svg);
        //document.getElementById('blockly_div').innerHTML = text;
        var data = new Blob([text], { type: "text/xml" });
        var a = document.createElement("a");
        a.href = window.URL.createObjectURL(data);
        var defaultName = "sketch" + dateStr() + ".svg";
        if (localobpname) defaultName = localobpname.replace(/obp$/, "svg");
        a.download = defaultName;
        a.textContent = "Download file!";
        var clickEvent = new MouseEvent("click", {
            "view": window,
            "bubbles": true,
            "cancelable": false
        });
        a.dispatchEvent(clickEvent);
    });
}


function savePNG() {
    var g = block2svg();
    g.then((svg) => {
        var text = Blockly.Xml.domToText(svg);
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext('2d');
        var DOMURL = window.URL || window.webkitURL || window;
        var img = new Image();
        //img.setAttribute("crossOrigin", 'Anonymous');
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            var clickEvent = new MouseEvent("click", {
                "view": window,
                "bubbles": true,
                "cancelable": false
            });
            canvas.toBlob(function (blob) {
                var a = document.createElement("a");
                a.href = URL.createObjectURL(blob);
                var defaultName = "sketch" + dateStr() + ".png";
                if (localobpname) defaultName = localobpname.replace(/obp$/, "png");
                a.download = defaultName;
                a.textContent = "Download file!";
                a.dispatchEvent(clickEvent);
            });

        }
        img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(text)));
    });
}
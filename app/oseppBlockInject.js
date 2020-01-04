function injectoseppBlock() {
    Blockly.ScratchMsgs.setLocale('zh-cn');
    var cbs = document.getElementsByClassName('language-obp');
    for (var cbi = 0, cb; cb = cbs[cbi]; cbi++) {
        var text = cb.getElementsByTagName('CODE')[0];
        if (!text) continue;
        var blockWorkspace = Blockly.inject(cb,
            {
                comments: true,
                disable: true,
                collapse: false,
                media: "http://192.168.0.3/scratch-blocks/media/",
                readOnly: false,
                scrollbars: false,
                toolbox: null,
                toolboxPosition: "start",
                sounds: "false",
                zoom: {
                    controls: false,
                    wheel: false,
                    startScale: 1,
                    maxScale: 10,
                    minScale: 0.01,
                    scaleSpeed: 1.1
                }
            });
        var dom = Blockly.Xml.textToDom(text.innerText);
        Blockly.Events.disable();
        blockWorkspace.clear();
        Blockly.Xml.domToWorkspace(dom, blockWorkspace);
        var div = cb.getElementsByClassName('injectionDiv')[0];
        var imgs = div.getElementsByTagName('image');
        for (var i = 0, img; img = imgs[i]; i++) {
            if (img.href.baseVal.startsWith('blockIcon/')) {
                img.href.baseVal = "http://192.168.0.3/" + img.href.baseVal;
            }
        }
        cb.id = 'oseppblock_' + cbi;
        cb.removeChild(text);
        function resizeSVG(blockDiv, workspace) {
            Blockly.Events.disable();
            var bs = blockDiv.getElementsByClassName('blocklySvg')[0];
            var tas = bs.getElementsByClassName('scratchCommentText');
            for (var i = 0, ta; ta = tas[i]; i++) {
                if (ta.tagName != 'TEXTAREA') continue;
                var t = ta.value;
                ta.innerHTML = t;
            }
            var bb = bs.getBBox();
            var padding = 0;
            bs.setAttribute('height', (bb.height + padding) + 'px');
            bs.setAttribute('width', (bb.width + padding) + 'px');
            var tbs = workspace.getTopBlocks();
            if (tbs.length == 0) return;
            var min = tbs[0].getRelativeToSurfaceXY();
            for (var i = 0, tb; tb = tbs[i]; i++) {
                var xy = tb.getRelativeToSurfaceXY();
                min.x = Math.min(min.x, xy.x);
                min.y = Math.min(min.y, xy.y);
            }
            if (min.x != 0 || min.y != 0) {
                for (var i = 0, tb; tb = tbs[i]; i++) {
                    tb.moveBy(-min.x, -min.y);
                }
            }
            var svgroot = blockDiv.parentNode;
            svgroot.style.height = (bb.height + padding) + 'px';
            svgroot.style.width = (bb.width + padding) + 'px';
            svgroot.innerHTML = Blockly.Xml.domToText(bs);
            Blockly.Events.enable();
            svgroot.addEventListener("DOMSubtreeModified", injectoseppBlock);
        }
        setTimeout(resizeSVG.bind(null, div, blockWorkspace), 50);
    }
}

// setInterval(() => {
//     injectoseppBlock();
// }, 500);


function getJS(url) {
    return new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.onload = function () {
            resolve(script);
        };
        script.onerror = function () {
            reject(script);
        };
        var d = new Date();
        script.src = url + '?' + 'time=' + d.getFullYear() + d.getMonth() + d.getDate();
        document.body.appendChild(script);
    });
}


function load_js_then_inject() {
    if (window.oseppBlock_loading) return;
    window.oseppBlock_loading = true;
    getJS("http://192.168.0.3/scratch-blocks/blockly_compressed_vertical.js").then(() => {
        Promise.all([
            getJS("http://192.168.0.3/scratch-blocks/blocks_compressed_arduino.js"),
            getJS("http://192.168.0.3/scratch-blocks/msg/messages.js"),
            getJS("http://192.168.0.3/scratch-blocks/msg/scratch_msgs.js")
        ]).then(() => {
            injectoseppBlock();
            function reCheck() {
                var tid = null;
                return function () {
                    if (tid) {
                        clearTimeout(tid);
                        tid = null;
                    }
                    tid = setTimeout(() => {
                        injectoseppBlock();
                    }, 300);
                }
            }
            var observer = new MutationObserver(reCheck());
            observer.observe(document, {
                'childList': true,
                'subtree': true
            });
        })
    });
}

window.addEventListener('load', load_js_then_inject);




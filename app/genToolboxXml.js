'use strict';
var genToolboxXml = function () {
    const fs = require('fs');

    var xmlStat = fs.statSync(`${__dirname}/toolbox.xml`);
    var jsStat = fs.statSync(`${__dirname}/blocklytoolbox.js`);
    var xmlTime = xmlStat.mtime.getTime();
    var jsTime = jsStat.mtime.getTime();
    if (jsTime < xmlTime) {
        console.log("gen Toolbox js file");
        var xml = fs.readFileSync(`${__dirname}/toolbox.xml`, 'utf8');
        xml = Blockly.Xml.textToDom(xml);

        var fileText = null;
        function append2fileText(domtext, name) {
            var text = domtext.split('\n');
            if (!fileText) fileText = "'use strict';\n";
            fileText += 'var ' + name + '=\n';
            for (var n = 0; n < text.length; n++) {
                var line = text[n];
                if (line.match(/[\w]+/i)) {
                    fileText += "'" + line + "'+\n";
                }
            }
            fileText += "''\n";
        }
        function node2dom(node) {
            var dom = goog.dom.createDom('xml');
            for (var x = 0, chile; chile = node.childNodes[x]; x++)
                dom.appendChild(chile.cloneNode(true));
            return (dom);
        }

        for (var i = 0, node; node = xml.childNodes[i]; i++) {
            if (node.nodeName.toLowerCase() == 'blockToolboxXml'.toLowerCase()) {
                var dom = node2dom(node);
                blockToolboxXml = Blockly.Xml.domToText(dom);
                append2fileText(blockToolboxXml, 'blockToolboxXml');
            } else if (node.nodeName.toLowerCase() == 'hardwareToolboxXml'.toLowerCase()) {
                var dom = node2dom(node);
                hardwareToolboxXml = Blockly.Xml.domToText(dom);
                append2fileText(hardwareToolboxXml, 'hardwareToolboxXml');
            } else if (node.nodeName.toLowerCase() == 'ModuleToolboxXml'.toLowerCase()) {
                var dom = node2dom(node);
                ModuleToolboxXml = Blockly.Xml.domToText(dom);
                append2fileText(ModuleToolboxXml, 'ModuleToolboxXml');
            }
        }
        fs.writeFileSync(`${__dirname}/blocklytoolbox.js`, fileText);
    } else {
        console.log("using Toolbox js file");
    }
}
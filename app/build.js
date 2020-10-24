const { spawn } = require('child_process');
const { writeFile, readFileSync, appendFile, writeFileSync } = require('fs')

const python2 = 'python';


const uncompress_file_name = 'oseppblockly_uncompressed.js';
const compress_file_name = 'oseppblock.js';

const app_js = [
    'serial.js',
    'display.js',
    'blocklytoolbox.js',
]

const uncompress = spawn(
    python2 + ' ./node_modules/google-closure-library/closure/bin/calcdeps.py',
    [
        '-o deps',
        `--output_file="${uncompress_file_name}"`,
        '-i "../scratch-blocks/core/blockly.js"',
        '-i "../scratch-blocks/build/gen_blocks.js"',
        '-i "../scratch-blocks/generators/arduino.js"',
        '-e "../scratch-blocks/core/block_render_svg_horizontal.js"',
        '-p "node_modules/google-closure-library"',
        '-p "../scratch-blocks/core"',
        '-p "../scratch-blocks/blocks_arduino"',
        '-p "../scratch-blocks/blocks_common"',
        '-p "../scratch-blocks/generators"',
    ],
    {
        shell: true
    }
);

uncompress.stdout.on('data', s =>
    console.log(s.toString())
);
uncompress.stderr.on('data', s =>
    console.error(s.toString())
);
uncompress.on('exit', (code, signal) => {
    if (code == 0) {
        const ftext = readFileSync(uncompress_file_name).toString().split(/\r?\n/);
        let reg = /^goog\.addDependency\("([^\)]+)"[^\[]+\[([^\]]+)\]/;
        let provides = ftext.map(s => reg.exec(s)).filter(m => m);
        provides = provides.filter(m => m[1].startsWith('../../../../'))
        provides = provides.map(m => m[2].split(',')).flat().map(s => s.trim());
        provides.sort((a, b) => a.length - b.length);
        provides = provides.map(s => `goog.require(${s});`);
        appendFile(uncompress_file_name, provides.join('\n'), (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('SUCCESS: ' + uncompress_file_name);
            }
        });
    }
});

const compress = spawn(
    python2 + ' ./node_modules/google-closure-library/closure/bin/calcdeps.py',
    [
        '-i "../scratch-blocks/core/blockly.js"',
        '-e "../scratch-blocks/core/block_render_svg_horizontal.js"',
        '-p "node_modules/google-closure-library"',
        '-p "../scratch-blocks/core"',
        '-o compiled',
        '-c "./node_modules/google-closure-compiler/compiler.jar"',
        '-f "--compilation_level=SIMPLE"',
        '-f "--language_in=ECMASCRIPT_2017"',
        '-f "--language_out=ECMASCRIPT5"',
        '-f "--rewrite_polyfills=false"',
        '-f "--define=goog.DEBUG=false"',
        '-f "--charset=UTF-8"',
        `-f "--js_output_file=${compress_file_name}"`,
        '-f "../scratch-blocks/blocks_arduino"',
        '-f "../scratch-blocks/blocks_common"',
        '-f "../scratch-blocks/generators"',
    ].concat(app_js.map(s => `-f "${s}"`)),
    {
        shell: true
    }
)

compress.stdout.on('data', s => console.log(s.toString()));
compress.stderr.on('data', s => console.error(s.toString()));
compress.on('exit', (code, signal) => {
    if (code == 0) {
        let ftext = readFileSync(compress_file_name).toString();
        ftext = ftext.replace(/\/\*[\w\W]+?\*\//g, '');
        ftext = `
/*
    Visual Blocks Editor

    Copyright 2011 Google Inc.
    https://developers.google.com/blockly/

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
${ftext}
`
        writeFile(compress_file_name, ftext, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('SUCCESS: ' + compress_file_name);
            }
        })
    }
});


function genTooboxjs() {
    let toolbox = readFileSync('toolbox.xml').toString();
    let blockToolboxXml = toolbox.match(/<blockToolboxXml>([\w\W]+)<\/blockToolboxXml>/)[1];
    let ModuleToolboxXml = toolbox.match(/<ModuleToolboxXml>([\w\W]+)<\/ModuleToolboxXml>/)[1];
    [blockToolboxXml, ModuleToolboxXml] = [blockToolboxXml, ModuleToolboxXml].map(s => {
        s = s.split(/[\r\n]+/).map(l => l.trim()).filter(l => l).join('');
        return "'" + '<xml id="toolbox-block" xmlns="http://www.w3.org/1999/xhtml">' + s + '</xml>' + "'"
    })
    let toolboxjs = ['var blockToolboxXml=' + blockToolboxXml, 'var ModuleToolboxXml=' + ModuleToolboxXml].join('\n');
    writeFileSync('blocklytoolbox.js', toolboxjs);
    console.log('blocklytoolbox.js')
}

genTooboxjs();
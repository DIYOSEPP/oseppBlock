
function createElectronPort() {
    const SerialPort = require('electron').remote.require('serialport');
    let serialport = (port, baudRate, onOpen, onData, onClose, onError) => {
        return new Promise((resolve, reject) => {
            let serial = new SerialPort(port, { baudRate, autoOpen: true }, (err) => {
                if (err) {
                    reject(err);
                } else {
                    onOpen();
                    resolve({
                        write: (data) => {
                            serial.write(data);
                        },
                        reset: () => {
                            return new Promise((r, j) => {
                                serial.set({ dtr: false });
                                setTimeout(() => serial.set({ dtr: true }), 10);
                                setTimeout(() => {
                                    serial.set({ dtr: false });
                                    r();
                                }, 10);
                            })
                        },
                        close: () => {
                            return new Promise((r, j) => {
                                serial.close((e) => {
                                    e ? j(e) : r();
                                });
                            })
                        }
                    })
                }
            })
            serial.on("error", (e) => {
                if (onError) onError(e);
            });
            serial.on("data", (d) => {
                onData(d);
            });
            serial.on("close", (e) => {
                onClose();
            });
        })
    }

    var mdns = require('mdns-js');
    let mdns_arduino_ips = [];

    let browser = mdns.createBrowser(mdns.tcp('arduino')); browser.on('ready', function () {
        browser.discover();
    });
    browser.on('update', function (data) {
        mdns_arduino_ips = mdns_arduino_ips.concat(
            data.addresses.map(p => ({
                type: 'ws',
                value: p,
                name: data.host
            }))
        )
    });

    let listports = () => {
        return SerialPort.list().then(ps =>
            ps.map(p => ({
                type: 'serial',
                value: p.path,
            })).concat(
                mdns_arduino_ips
            )
        )
    };

    let arduinoPath = null;
    const fs = require("fs");
    const path = require("path");
    let isArduinoPath = (dir) => {
        let ps = [
            dir,
            path.join(dir, "Contents", "Java")
        ].map(p => [path.join(p, "hardware", "tools", "avr", "bin", "avrdude"), path.join(p, 'arduino-builder')]);

        ps = ps.concat(ps.map(p => p.map(s => s + '.exe')));

        for (let p of ps) {
            if (fs.existsSync(p[0]) && fs.existsSync(p[1])) {
                arduinoPath = {
                    path: dir,
                    builder: p[1],
                    uploader: p[0]
                }
                return true;
            }
        }
        return false;
    }

    const { dialog, app, process, net } = require("electron").remote;
    let curPath = path.resolve(app.getPath("exe"));
    curPath = path.dirname(curPath);
    let dirset = [curPath];
    while (dirset.length) {
        let dir = dirset.pop();
        let files = fs.readdirSync(dir);
        for (let f of files) {
            let fp = path.join(dir, f);
            let st = fs.statSync(fp);
            if (st.isDirectory(fp)) {
                if (f.toLowerCase().indexOf('arduino') >= 0) {
                    if (isArduinoPath(fp)) break;
                }
                dirset.push(fp);
            }
        }
    }

    let doCompile = (code, callback) => {
        return new Promise((resolve, reject) => {
            if (!code || !code.trim()) {
                callback('error', 'empty code')
                return reject('empty code');;
            }
            if (!arduinoPath) {
                let file = dialog.showOpenDialogSync({
                    title: 'arduinoPath',
                    properties: ["openFile"],
                    filters: [{
                        extensions: ['', 'exe'],
                        name: 'arduino-builder'
                    }]
                });
                if (file) {
                    isArduinoPath(path.dirname(file[0]));
                }
            }
            if (!arduinoPath) {
                callback('error', 'compiler not found');
                return reject('compiler not found');
            }
            try {
                let curPath = path.resolve(app.getPath("exe"));
                curPath = path.dirname(curPath);
                let cachedir = path.join(curPath, 'build', 'cache');
                let sketchdir = path.join(curPath, 'build', 'sketch');
                [
                    cachedir,
                    sketchdir
                ].forEach(p => {
                    if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true })
                })
                fs.writeFileSync(path.join(sketchdir, "sketch.ino"), code);
                callback('message', 'compiling');
                const spawn = require("child_process").spawn;
                let toolpath=path.dirname(arduinoPath.builder);
                const genhex = spawn(arduinoPath.builder,
                    [
                        `-hardware "${path.join(toolpath, "/hardware")}"`,
                        `-tools "${path.join(toolpath, "/hardware/tools/avr")}"`,
                        `-tools "${path.join(toolpath, "/tools-builder")}"`,
                        `-libraries "${path.join(toolpath, "/libraries")}"`,
                        "-fqbn arduino:avr:uno",
                        `-build-path "${cachedir}"`,
                        `"${path.join(sketchdir, "sketch.ino")}"`
                    ], { shell: true });
                genhex.stdout.on("data", (data) => {
                    callback('stdout', data.toString());
                });
                genhex.stderr.on("data", (data) => {
                    callback('stderr', data.toString());
                });
                genhex.on("close", (exitcode) => {
                    if (exitcode == 0) {
                        let hexfile = path.join(cachedir, 'sketch.ino.hex');
                        resolve(hexfile);
                    } else {
                        callback('error', 'exit code:' + exitcode);
                        return reject('exit code:' + exitcode);
                    }
                });
            } catch (e) {
                callback('error', e);
                return reject(e);
            }
        })
    }
    let compiler = (code, callback) => {
        callback('start', 'verify');
        return doCompile(code, callback).then(f => { callback('done'); return fs.readFileSync(f).toString(); })
    }

    let doUpload = (hexfile, port, callback, rate) => {
        return new Promise((resolve, reject) => {
            try {
                callback('message', 'uploading');
                const spawn = require("child_process").spawn;
                let toolpath=path.dirname(arduinoPath.builder);
                const up = spawn(arduinoPath.uploader, [
                    `-C "${path.join(toolpath, "/hardware/tools/avr/etc/avrdude.conf")}"`,
                    "-patmega328p -carduino -D",
                    `-Uflash:w:"${hexfile}":i`,
                    `-P "${port}"`,
                    `-b${rate}`,
                    " -q"],
                    { shell: true });
                up.stdout.on("data", (data) => {
                    callback('stdout', data.toString());
                });
                up.stderr.on("data", (data) => {
                    callback('stderr', data.toString());
                });

                up.on("close", (exitcode) => {
                    if (exitcode == 0) {
                        callback('done');
                        return resolve();
                    } else {
                        callback('error', 'exit code:' + exitcode);
                        return reject('exit code:' + exitcode);
                    }
                });
            } catch (e) {
                callback('error', e);
                return reject(e);
            }
        })
    }


    let uploader = (code, port, callback, rate = 115200) => {
        callback('start', 'compiling');
        return doCompile(code, callback).then(hexfile => doUpload(hexfile, port, callback, rate));
    }

    let result = {
        SerialPort: serialport,
        ListPorts: listports,
        Cleanup: [() => browser.stop()],
        compiler,
        uploader
    }

    let args = process.argv.slice(1);
    let obpFromCLI = args.filter(s => path.extname(s).toLowerCase() === '.obp' && fs.existsSync(s));
    if (obpFromCLI.length) {
        result.obp = {
            name: path.basename(obpFromCLI[0]),
            xml: fs.readFileSync(obpFromCLI[0]).toString()
        }
    }

    let locale = args.map(s => s.match(/locale=(.+)/)).filter(m => m).map(m => m[1]);
    if (locale.length) {
        result.locale = locale[0]
    }

    result.versionOnline = new Promise((resolve, reject) => {
        try {
            const request = net.request("http://www.osepp.com/block/package.json");
            request.on("response", (response) => {
                if (response.statusCode == 200) {
                    response.on("data", (chunk) => {
                        var json = JSON.parse(chunk);
                        if (json.version) {
                            let version = String(json.version).trim().split('.').map(s => parseInt(s));
                            resolve(version);
                        } else {
                            reject('bad data');
                        }
                    });
                } else {
                    reject(response.statusCode);
                }
            });
            request.on("error", reject);
            request.end();
        } catch (e) {
            reject(e);
        }
    })

    return result
}

window.electronPort = createElectronPort();

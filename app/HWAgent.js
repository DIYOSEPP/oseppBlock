"use strict";


goog.provide('HWAgent.Serial');
var HWAgent = HWAgent || {}
HWAgent.Serial = function (port, baudRate, eventHandle) {
    this.port = port;
    this.baudRate = baudRate;
    if (eventHandle) this.onEvent = eventHandle;
};
HWAgent.Serial.portList = {};
HWAgent.Serial.regAgents = [];

HWAgent.Serial.register = function (agent) {
    if (agent.init()) {
        HWAgent.Serial.regAgents.push(agent);
    }
}
HWAgent.Serial.addPorts = function (value, name, agent) {
    HWAgent.Serial.portList[value] = { name: name, agent: agent };
}
HWAgent.Serial.list = function (callback) {
    HWAgent.Serial.portList = {};
    var de = HWAgent.Serial.regAgents.length;
    var saveport = function () {
        de--;
        if ((callback) && (de <= 0)) {
            var ps = [];
            for (var key in HWAgent.Serial.portList) {
                ps.push({ name: HWAgent.Serial.portList[key].name, value: key });
            }
            callback(ps);
        }
    }
    for (var i = 0, agent; agent = HWAgent.Serial.regAgents[i]; i++) {
        agent.list(saveport);
    }
}
HWAgent.Serial.findAgent = function (portName) {
    var p = HWAgent.Serial.portList[portName];
    if (p) return p.agent;
    for (var i = 0; i < HWAgent.Serial.regAgents.length; i++) {
        if ('hit' in HWAgent.Serial.regAgents[i]) {
            if (HWAgent.Serial.regAgents[i].hit(portName)) return HWAgent.Serial.regAgents[i];
        }
    }
    return null;
}
HWAgent.Serial.Debugging = true;

HWAgent.Serial.prototype.port = null;
HWAgent.Serial.prototype.baudRate = 115200;

HWAgent.Serial.prototype.isOpened = function () {
    return false;
};

HWAgent.Serial.prototype.open = function () {
    this.log('open serial', arguments);
};

HWAgent.Serial.prototype.close = function () {
    this.log('close serial', arguments);
};

HWAgent.Serial.prototype.write = function (data) {
    this.log('write serial', arguments);
};

HWAgent.Serial.prototype.updateOption = function (option) {
    this.log('option serial', arguments);
};

HWAgent.Serial.prototype.onEvent = function (event, data) {
    this.log('on event', Array.from(arguments));
};

HWAgent.Serial.prototype.log = function () {
    if (HWAgent.Serial.Debugging) console.log(arguments);
};

HWAgent.Serial.prototype.onOpen_ = function () {
    this.onEvent('open');
};

HWAgent.Serial.prototype.onClose_ = function () {
    this.onEvent('close');
};

HWAgent.Serial.prototype.onError_ = function (error) {
    this.onEvent('error', error);
};

HWAgent.Serial.prototype.onDone_ = function (msg) {
    this.onEvent('uploaded', msg);//upload done|err
};

HWAgent.Serial.prototype.onUpload_ = function (msg) {
    this.onEvent('uploading', msg);//upload msg|err
};

HWAgent.Serial.prototype.onData_ = function (data) {
    this.onEvent('data', data);
};

HWAgent.Serial.prototype.onHWReset_ = function () {
    this.onEvent('hwreset');
};

HWAgent.Serial.prototype.onOption_ = function (newOption) {
    this.onEvent('option', newOption);
};

goog.provide('HWAgent.nodeSerial');
goog.require('HWAgent.Serial');

HWAgent.nodeSerial = function (port, baudRate, eventHandle) {
    HWAgent.nodeSerial.superClass_.constructor.call(this, port, baudRate, eventHandle);
};
HWAgent.nodeSerial.portList = [];
HWAgent.nodeSerial.list = function (callback) {
    try {
        var serialport = require("serialport");
        var onlist = function (callback, ports) {
            HWAgent.nodeSerial.portList = [];
            for (var i = 0; i < ports.length; i++) {
                HWAgent.Serial.addPorts(ports[i].comName, ports[i].comName, HWAgent.nodeSerial);
                HWAgent.nodeSerial.portList.push(ports[i].comName);
            }
            if (callback) callback(ports.length);
        }
        serialport.list().then((e) => onlist(callback, e));
    } catch (e) {
        this.log(e);
    }
};
HWAgent.nodeSerial.init = function () {
    try {
        require("serialport");//no serial,goto catch
        return true;
    } catch (err) {
        return false;
    }
};
HWAgent.nodeSerial.hit = function (portName) {
    for (var i = 0; i < HWAgent.nodeSerial.portList.length; i++) {
        if (HWAgent.nodeSerial.portList[i] == portName) return true;
    }
    return false;
};
goog.inherits(HWAgent.nodeSerial, HWAgent.Serial);

HWAgent.nodeSerial.prototype.serial_ = null;
HWAgent.nodeSerial.prototype.reOpenFlag = false;
HWAgent.nodeSerial.prototype.open = function () {
    if (this.serial_) {
        if (this.isOpened()) return;
    }
    var SerialPort = require("serialport");
    this.serial_ = new SerialPort(this.port, { baudRate: this.baudRate, autoOpen: false });
    var aSerial = this;
    var onOpen = function () {
        aSerial.onOpen_();
    };
    var onClose = function () {
        aSerial.serial_ = null;
        aSerial.onClose_();
    };
    var onError = function (error) {
        aSerial.onError_(error);
        if (aSerial.serial_ && (!aSerial.serial_.isOpen)) {
            aSerial.serial_ = null;
            aSerial.onClose_();
        }
    };
    var onData = function (data) {
        aSerial.onData_(data);
    };

    this.serial_.on("error", onError);
    this.serial_.on("open", onOpen);
    this.serial_.on("data", onData);
    this.serial_.on("close", onClose);
    this.serial_.open();

}

HWAgent.nodeSerial.prototype.close = function () {
    if (this.serial_) {
        this.serial_.close();
    }
};

HWAgent.nodeSerial.prototype.write = function (data) {
    this.serial_.write(data);
};

HWAgent.nodeSerial.prototype.isOpened = function () {
    if (this.serial_) return this.serial_.isOpen;
    return false;
};

HWAgent.nodeSerial.prototype.upload = function (hex) {
    var hexfile = hex.filename;
    var arduinoPath = window.localStorage.buildinArduinoIDEPath || window.localStorage.arduinoIDEPath;
    if (!arduinoPath) {
        this.onDone_("Invalid Arduino Path");
        return;
    }
    var aSerial = this;

    var runUploadCmd = function () {
        try {
            const path = require('path');
            var app = `"${path.join(arduinoPath, "/hardware/tools/avr/bin/avrdude")}"`;
            var argConf = `-C "${path.join(arduinoPath, "/hardware/tools/avr/etc/avrdude.conf")}"`;
            var argCpu = "-patmega328p -carduino -D";

            var argPort = `-P "${aSerial.port}"`;
            var argBaud = "-b115200";
            var argFile = `-Uflash:w:"${hexfile}":i`;
            const spawn = require("child_process").spawn;
            const upload = spawn(app, [argConf, argCpu, argFile, argPort, argBaud, , " -q"], { shell: true });

            upload.stdout.on("data", (data) => {
                aSerial.onUpload_(data);
            });
            upload.stderr.on("data", (data) => {
                aSerial.onUpload_(data);
            });
            upload.on("close", (exitcode) => {
                aSerial.onDone_();
                if (aSerial.reOpenFlag) {
                    aSerial.reOpenFlag = false;
                    aSerial.open();
                }
            });
        }
        catch (e) {
            aSerial.onDone_("unknow error:uploading");
        }
    };

    if (aSerial.serial_ && aSerial.serial_.isOpen) {
        aSerial.reOpenFlag = true;
        aSerial.serial_.close(runUploadCmd);
    } else {
        runUploadCmd();
    }

};

HWAgent.nodeSerial.prototype.updateOption = function (option) {
    if (!this.serial_) return;
    var baud = option.baudRate;
    this.serial_.update({ baudRate: baud });
    this.onOption_({ 'baudRate': baud });
}

HWAgent.nodeSerial.prototype.resetHW = function (option) {
    if (!this.serial_) return;
    function setdtr() {
        function resetdtr() {
            function fireEven() {
                this.onHWReset_();
            }
            this.serial_.set({ dtr: true }, fireEven.bind(this));
        }
        setTimeout(resetdtr.bind(this), 50);
    }
    this.serial_.set({ dtr: false }, setdtr.bind(this));
}

HWAgent.Serial.register(HWAgent.nodeSerial);

goog.provide('HWAgent.Esp8266Serial');
goog.require('HWAgent.Serial');


HWAgent.Esp8266Serial = function (port, baudRate, eventHandle) {
    HWAgent.nodeSerial.superClass_.constructor.call(this, port, baudRate, eventHandle);
};
HWAgent.Esp8266Serial.init = function () {
    try {
        if (HWAgent.Esp8266Serial.mdnsbrowser) return true;
        var mdns = require("mdns");
        var sequence = [
            mdns.rst.DNSServiceResolve()
            , "DNSServiceGetAddrInfo" in mdns.dns_sd ? mdns.rst.DNSServiceGetAddrInfo() : mdns.rst.getaddrinfo({ families: [4] })
            , mdns.rst.makeAddressesUnique()
        ];
        var mdnsbrowser = mdns.createBrowser(mdns.tcp("arduino"), { resolverSequence: sequence });
        mdnsbrowser.on("serviceUp", function (service) {
            for (var port, i = 0; port = HWAgent.Esp8266Serial.Ports[i]; i++) {
                if ((port.hostName == service.name) &&
                    (port.addresses == service.addresses)) return;
            }
            var newport = new Object;
            newport.hostName = service.name;
            newport.ip = service.addresses;
            HWAgent.Esp8266Serial.Ports.push(newport);
        });
        mdnsbrowser.on("serviceDown", function (service) {
            for (var port, i = 0; port = HWAgent.Esp8266Serial.Ports[i]; i++) {
                if ((port.hostName == service.name) && (port.addresses == service.addresses)) {
                    HWAgent.Esp8266Serial.Ports.splice(i, 1);
                    break;
                }
            }
        });
        mdnsbrowser.on("error", function (error) {
            console.log("service error: ", error);
        });
        mdnsbrowser.start();
        HWAgent.Esp8266Serial.mdnsbrowser = mdnsbrowser;
        return true;
    } catch (err) {
        return false;
    }
};

HWAgent.Esp8266Serial.mdnsbrowser = null;
HWAgent.Esp8266Serial.Ports = [];

HWAgent.Esp8266Serial.list = function (callback) {
    for (var i = 0; i < HWAgent.Esp8266Serial.Ports.length; i++) {
        HWAgent.Serial.addPorts(
            HWAgent.Esp8266Serial.Ports[i].ip[0],
            HWAgent.Esp8266Serial.Ports[i].hostName + '(' + HWAgent.Esp8266Serial.Ports[i].ip[0] + ')',
            HWAgent.Esp8266Serial);
    }
    if (callback) callback(HWAgent.Esp8266Serial.Ports.length);
};
HWAgent.Esp8266Serial.hit = function (portName) {
    if (portName.startsWith('//')) return true;
    var reIP = /(1\d\d|2[0-4]\d|25[0-5]|\d{1,2})\.(1\d\d|2[0-4]\d|25[0-5]|\d{1,2})\.(1\d\d|2[0-4]\d|25[0-5]|\d{1,2})\.(1\d\d|2[0-4]\d|25[0-5]|\d{1,2})/;
    if (reIP.exec(portName)) return true;
    return false;
};
goog.inherits(HWAgent.Esp8266Serial, HWAgent.Serial);

HWAgent.Esp8266Serial.prototype.sock_ = null;

HWAgent.Esp8266Serial.prototype.open = function () {
    if (this.sock_) {
        if (this.isOpened()) return;
        this.sock_.end();
        this.sock_.destroy();
    }
    var ip = this.port;
    if (!ip) return;
    var onOpen = function () {
        this.onOpen_();
    }
    var onClose = function () {
        this.sock_ = null;
        this.onClose_();
    };
    var onError = function (error) {
        this.onError_(error);
        if (this.sock_ && (!this.isOpened())) this.sock_ = null;
    };
    var onData = function (data) {
        this.onData_(data);
    };

    const { net } = require("electron").remote;
    const request = net.request("http://" + ip + "/getbaudrate?baudrate=" + this.baudRate);
    request.on("response", (response) => {
        if (response.statusCode == 200) {
            response.on("data", (chunk) => {
                this.sock_ = require("net").connect("8080", ip, onOpen.bind(this));
                this.sock_.isNetWrok = true;
                this.sock_.on('data', onData.bind(this));
                this.sock_.on('end', onClose.bind(this));
                this.sock_.on('close', onClose.bind(this));
                this.sock_.on("error", onError.bind(this));
                this.sock_.setNoDelay(true);
                this.sock_.setKeepAlive(true);
                this.onOption_({ 'baudRate': chunk });
            });
        }
    });
    request.on("error", (error) => {
        this.log(error);
    });
    request.end();

}

HWAgent.Esp8266Serial.prototype.close = function () {
    if (this.sock_) {
        this.sock_.end();
        this.sock_.destroy();
    }
}
HWAgent.Esp8266Serial.prototype.write = function (data) {
    this.sock_.write(data);
}
HWAgent.Esp8266Serial.prototype.upload = function (hex) {
    var hexfile = hex.filename;
    var arduinoPath = window.localStorage.buildinArduinoIDEPath || window.localStorage.arduinoIDEPath;

    if (!arduinoPath) {
        this.onDone_("Invalid Arduino Path");
        return;
    }
    var aSerial = this;
    try {
        const path = require('path');
        var app = `"${path.join(arduinoPath, "/hardware/tools/avr/bin/arduinoOTA")}"`;
        var argFile = `-sketch "${hexfile}"`;
        var argAddress = `-address "${this.sock_.remoteAddress}"`;

        const spawn = require("child_process").spawn;
        const upload = spawn(app, [argAddress, "-port 80", argFile, "-upload /pgm/upload", "-sync /pgm/sync", "-reset /log/reset", "-sync_exp 204:SYNC"], { shell: true });
        upload.stdout.on("data", (data) => {
            aSerial.onUpload_(data);
        });
        upload.stderr.on("data", (data) => {
            aSerial.onUpload_(data);
        });
        upload.on("close", (exitcode) => {
            aSerial.onDone_();
        });
    }
    catch (e) {
        aSerial.onDone_("unknow error:uploading");
    }
};

HWAgent.Esp8266Serial.prototype.isOpened = function () {
    if (this.sock_) return this.sock_.readyState == 'open';
    return false;
};

HWAgent.Esp8266Serial.prototype.updateOption = function (option) {
    if (!this.sock_) return;
    const { net } = require("electron").remote;
    const request = net.request("http://" + this.sock_.remoteAddress + "/getbaudrate?baudrate=" + option.baudRate);
    request.on("response", (response) => {
        if (response.statusCode == 200) {
            response.on("data", (chunk) => {
                this.onOption_({ 'baudRate': chunk });
            });
        }
    });
    request.on("error", (error) => {
        this.log(error);
    });
    request.end();
}

HWAgent.Esp8266Serial.prototype.resetHW = function (option) {
    if (!this.sock_) return;
    try {
        const { net } = require("electron").remote;
        const request = net.request("http://" + this.sock_.remoteAddress + "/reset");
        request.on("response", (response) => {
            if (response.statusCode == 200) {
                this.onHWReset_();
            }
        });
        request.on("error", (error) => {
            this.log(error);
        });
        request.end();
    } catch (e) {
        this.log(e);
    }
}

HWAgent.Serial.register(HWAgent.Esp8266Serial);



goog.provide('HWAgent.Generator');

HWAgent.Generator = function (code, eventHandle) {

}

HWAgent.Generator.regAgents = [];

HWAgent.Generator.register = function (agent) {
    if (agent.init()) HWAgent.Generator.regAgents.push(agent);
}

HWAgent.Generator.prototype.hex = null;//hex={filename,text}

HWAgent.Generator.prototype.onEvent = function (event, data) {

}

HWAgent.Generator.prototype.onCompiling_ = function (msg) {
    this.onEvent('compiling', msg);
}
HWAgent.Generator.prototype.onDone_ = function (msg) {
    this.onEvent('compiled', msg);
}

goog.provide('HWAgent.nodeGenerator');
goog.require('HWAgent.Generator');

HWAgent.nodeGenerator = function (code, eventHandle) {
    if (eventHandle) this.onEvent = eventHandle;
    this.hex = null;
    var arduinoPath = window.localStorage.buildinArduinoIDEPath || window.localStorage.arduinoIDEPath;
    if (!arduinoPath) {
        this.onDone_("Invalid Arduino Path");
        return;
    }
    var aAgent = this;
    try {
        var tmpdir = HWAgent.nodeGenerator.getTmpDir();
        const fs = require("fs");
        const path = require('path');
        fs.writeFileSync(path.join(tmpdir, "/sketch/sketch.ino"), code);
        var builder = `"${path.join(arduinoPath, "/arduino-builder")}"`;
        var argHardware = `-hardware "${path.join(arduinoPath, "/hardware")}"`;
        var argTools = `-tools "${path.join(arduinoPath, "/hardware/tools/avr")}"`;
        var argcFlag = `-tools "${path.join(arduinoPath, "/tools-builder")}"`;
        var argLibraries = `-libraries "${path.join(arduinoPath, "/libraries")}"`;
        var argFlag = "-fqbn arduino:avr:uno";
        var argFile = `"${path.join(tmpdir, "/sketch/sketch.ino")}"`;
        var argBuildPath = `-build-path "${path.join(tmpdir, "/buildpath")}"`;

        const spawn = require("child_process").spawn;
        const genhex = spawn(builder, [argHardware, argTools, argcFlag, argLibraries, argFlag, argBuildPath, argFile], { shell: true });
        aAgent.onCompiling_("Compiling\n");
        genhex.stdout.on("data", (data) => {
            aAgent.onCompiling_(data);
        });
        genhex.stderr.on("data", (data) => {
            aAgent.onCompiling_(data);
        });
        genhex.on("close", (exitcode) => {
            if (exitcode == 0) {
                var file = "\"" + tmpdir + "/buildpath/sketch.ino.hex" + "\"";
                aAgent.hex = { filename: file, text: '' };//need 2 read file to text
                aAgent.onDone_();
            } else {
                aAgent.onDone_("unknow error:Compiling");
            }
        });
    }
    catch (e) {
        aAgent.onDone_("unknow error:Compiling");
    }
}
HWAgent.nodeGenerator.init = function () {
    try {
        require("fs");
        return true;
    } catch (e) {
        return false;
    }
}
HWAgent.nodeGenerator.getTmpDir = function () {
    var tmpdir = window.localStorage.tmpdir;
    const fs = require("fs");
    const path = require("path");
    try {
        fs.accessSync(path.join(tmpdir, "buildpath"));
        fs.accessSync(path.join(tmpdir, "sketch"));
    } catch (e) {
        tmpdir = null;
    }
    if (!tmpdir) {
        const os = require("os");
        var t = os.tmpdir();
        tmpdir = fs.mkdtempSync(path.join(t, "osepp-"));
        fs.mkdirSync(path.join(tmpdir, "buildpath"));
        fs.mkdirSync(path.join(tmpdir, "sketch"));
        window.localStorage.tmpdir = tmpdir;
    }
    return tmpdir;
}
goog.inherits(HWAgent.nodeGenerator, HWAgent.Generator);
HWAgent.Generator.register(HWAgent.nodeGenerator);
const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');

let win = null;

function createWindow() {
    //Menu.setApplicationMenu(Menu.buildFromTemplate([]));
    if (process.platform == 'win32') {
        win = new BrowserWindow({
            show: false,
            backgroundColor: '#fff',
            width: 1024,
            height: 768,
            icon: `${__dirname}/media/osepp.ico`,
            webPreferences: { enableRemoteModule: true, nodeIntegration: false, preload: __dirname + '/preload.js' },
            autoHideMenuBar: true
        });
    } else {
        win = new BrowserWindow({
            show: false,
            backgroundColor: '#fff',
            width: 1024,
            height: 768,
            webPreferences: { enableRemoteModule: true, nodeIntegration: false, preload: __dirname + '/preload.js' },
            autoHideMenuBar: true
        });
    }

    win.maximize();
    if (isDev) {
        win.loadURL(`file://${__dirname}/index_uncompressed.html`);
    } else {
        win.loadURL(`file://${__dirname}/index.html`);
    }

    //win.webContents.openDevTools();
    win.once('ready-to-show', () => {
        win.show();
    })
    win.on('closed', () => {
        win = null;
    })
    win.webContents.on('new-window', (event, url) => {
        event.preventDefault()
        const subwin = new BrowserWindow({ show: true })
        subwin.setTitle("oseppBlock")
        //subwin.once('ready-to-show', () => subwin.show())
        subwin.loadURL(url)
        event.newGuest = subwin
    })
}

app.on('ready', createWindow);


app.on('window-all-closed', () => {
    //if (process.platform !== 'darwin') {
    app.quit();
    //}
})

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
})

let mdns_Ports = [];
const mdns = require("mdns");
var mdnsbrowser = mdns.createBrowser(mdns.tcp("arduino"), {
    resolverSequence: [
        mdns.rst.DNSServiceResolve()
        , "DNSServiceGetAddrInfo" in mdns.dns_sd ? mdns.rst.DNSServiceGetAddrInfo() : mdns.rst.getaddrinfo({ families: [4] })
        , mdns.rst.makeAddressesUnique()
    ]
});
mdnsbrowser.on("serviceUp", function (service) {
    mdns_Ports = mdns_Ports.filter(port => port.name !== service.name && port.addresses !== service.addresses[0]);
    mdns_Ports.push({
        hostName: service.name,
        ip: service.addresses[0]
    })
});
mdnsbrowser.on("serviceDown", function (service) {
    mdns_Ports = mdns_Ports.filter(port => port.name !== service.name && port.addresses !== service.addresses);
});
mdnsbrowser.on("error", function (error) {
    console.log("service error: ", error);
});
mdnsbrowser.start();

ipcMain.on('mdns', (event) => {
    event.reply('mdns', mdns_Ports);
})

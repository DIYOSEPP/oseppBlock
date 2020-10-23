const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
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
            webPreferences: { enableRemoteModule: true, nodeIntegration: false, preload: path.join(__dirname, 'preload.js') },
            autoHideMenuBar: true
        });
    } else {
        win = new BrowserWindow({
            show: false,
            backgroundColor: '#fff',
            width: 1024,
            height: 768,
            webPreferences: { enableRemoteModule: true, nodeIntegration: false, preload: path.join(__dirname, 'preload.js') },
            autoHideMenuBar: true
        });
    }

    win.maximize();
    if (isDev) {
        win.loadURL(`file://${__dirname}/index_uncompressed.html`);
        win.webContents.openDevTools();
    } else {
        win.loadURL(`file://${__dirname}/index.html`);
    }

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


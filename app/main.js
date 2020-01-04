const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow() {
    //Menu.setApplicationMenu(Menu.buildFromTemplate([]));
    if (process.platform == 'win32') {
        win = new BrowserWindow({
            show: false,
            enableLargerThanScreen: true,
            width: 1024,
            height: 768,
            icon: `${__dirname}/media/osepp.ico`,
            webPreferences: { nodeIntegration: true },
            autoHideMenuBar: true
        });
    } else {
        win = new BrowserWindow({
            show: false,
            enableLargerThanScreen: true,
            width: 1024,
            height: 768,
            webPreferences: { nodeIntegration: true },
            autoHideMenuBar: true
        });
    }

    win.maximize();

    win.loadURL(`file://${__dirname}/index.html`);

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


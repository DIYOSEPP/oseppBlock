const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow () {
    if (process.platform == 'win32') {
        win = new BrowserWindow({show:false,width: 1024, height: 768,icon:`${__dirname}/media/osepp.ico`});
    }else{
        win = new BrowserWindow({show:false,width: 1024, height: 768});
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
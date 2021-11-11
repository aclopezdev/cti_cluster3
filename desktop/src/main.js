const { app, BrowserWindow } = require('electron')
const path = require('path')
require('dotenv').config();

const env = process.env.NODE_ENV || 'dev';

if (env === 'dev') 
{
    try {
        require('electron-reloader')(module, {
            debug: true,
            watchRenderer: true
        });
    } catch (_) { console.log('Error'); }
}


function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences:
        {
            scrollBounce: true,
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('src/index.html').then(()=>
    {
        win.setTitle(process.env.TITLE || 'Project-Template');
    });
    win.maximize();
}


app.whenReady().then(() => {
    createWindow();
});


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
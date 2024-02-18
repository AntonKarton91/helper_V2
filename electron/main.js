const { app, BrowserWindow } = require('electron');

const path = require('path')
const fs = require("fs");
const { ipcMain } = require('electron');
const url = require("url");


ipcMain.on('file-drop', (event, filePath, pathTo) => {
        fs.copyFile(filePath, 'Files/' + pathTo + "/" + path.basename(filePath), (err) => {
            if (err) console.error(err);
        });
});


function createWindow () {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })


    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true
    });
    mainWindow.webContents.openDevTools();

    mainWindow.loadURL(startUrl);

}


app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    // Для приложений и строки меню в macOS является обычным делом оставаться
    // активными до тех пор, пока пользователь не выйдет окончательно используя Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})
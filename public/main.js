const { app, BrowserWindow } = require('electron');

const path = require('path')
const fs = require("fs");
// const isDev = require('electron-is-dev')
const { ipcMain } = require('electron');
require('@electron/remote/main').initialize()

// if (require('electron-squirrel-startup')) {
//     app.quit();
// }

// ipcMain.on('file-drop', (event, files) => {
//     files.forEach((file) => {
//         const filePath = path.join(__dirname, 'uploaded_files', file.name);
//         fs.copyFile(file.path, filePath, (err) => {
//             if (err) console.error(err);
//         });
//     });
// });

ipcMain.on('file-drop', (event, filePaths) => {
    console.log("work")
    filePaths.forEach((filePath) => {
        // Обработка файлов, сохранение в директорию приложения и т.д.
        console.log('ppa/' + path.basename(filePath));

        // Пример сохранения файла в директорию
        fs.copyFile(filePath, 'ppa/' + path.basename(filePath), (err) => {
            if (err) console.error(err);
        });
    });
});

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    });
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL("http://localhost:3000")

    // mainWindow.setMenuBarVisibility(false)

};


app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
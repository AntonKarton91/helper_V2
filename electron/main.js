const { app, BrowserWindow } = require('electron');
const path = require('path')
const fs = require("fs");
const { ipcMain } = require('electron');
const url = require("url");
require('dotenv').config({ path: path.join(__dirname, '.env') });


ipcMain.on('file-drop', (event, filePath, pathTo) => {
    const StoragePath = path.resolve(__dirname, "../Files")
    const folderName = pathTo
    const folderPath = path.resolve(StoragePath, folderName)
    const foo = async () => {
        if (fs.existsSync(folderPath)) {
            await fs.rmSync(folderPath, { recursive: true, force: true });
        }
        await fs.mkdir(folderPath, ()=>{});
        fs.copyFile(filePath, 'Files/' + pathTo + "/" + path.basename(filePath), (err) => {
                if (err) console.error(err);
            });
    }
    foo()


    console.log(path.resolve(__dirname, "../Files"))
        // fs.copyFile(filePath, 'Files/' + pathTo + "/" + path.basename(filePath), (err) => {
        //     if (err) console.error(err);
        // });
});

function createWindow () {
    const mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
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
    if (process.platform !== 'darwin') app.quit()
})

app.on('before-quit', () => {
    const directoryPath = path.resolve(__dirname, "../Files")
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Ошибка чтения папки:', err);
            return;
        }
        files.forEach(file => {
            const filePath = path.join(directoryPath, file);
            fs.rmSync(filePath, { recursive: true, force: true });
        });
    });
});
"use strict";
exports.__esModule = true;
var electron = require("electron");
var ipcMain = electron.ipcMain;
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var path = require("path");
var mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({ width: 900, height: 680, webPreferences: { webSecurity: false } });
    mainWindow.loadURL(process.env.NODE_ENV === "development" ? "http://localhost:3000/index.html" : "file://" + path.join(__dirname, "../build/index.html"));
    mainWindow.on("closed", function () { return mainWindow = null; });
}
app.on("ready", createWindow);
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});
ipcMain.on("toggle-image", function (event, arg) {
    mainWindow.show();
    mainWindow.webContents.send("image", arg);
});
ipcMain.on("toggle-settings", function () {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
});

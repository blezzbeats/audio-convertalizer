const { app, BrowserWindow } = require('electron')
const path = require('path')
const fs = require('fs')
const dropzone = require('dropzone')

//require the ffmpeg package so we can use ffmpeg using JS
const ffmpeg = require('fluent-ffmpeg');

//Get the paths to the packaged versions of the binaries we want to use
const ffmpegPath = require('ffmpeg-static').replace(
    'app.asar',
    'app.asar.unpacked'
);
const ffprobePath = require('ffprobe-static').path.replace(
    'app.asar',
    'app.asar.unpacked'
);
//tell the ffmpeg package where it can find the needed binaries.
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 185,
    height: 211,
    title: "Audio Convertalizer",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    nodeIntegration: true,
    contextIsolation: false,
    frame: false,
    resizable: false,
    transparent: true
    },
  })

  win.loadFile('index.html')
  win.removeMenu()
  win.setResizable(false)
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
})

app.on('window-all-closed', () => {
  /*if (process.platform !== 'darwin')*/ app.quit()
})

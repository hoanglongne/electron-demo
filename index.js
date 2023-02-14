const { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain } = require('electron')
const path = require('path')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const axios = require("axios");

let win = null;

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile('index.html')
  win.webContents.openDevTools()
} 

app.whenReady().then(() => {
  createWindow()
  const image = nativeImage.createFromPath('public/trayIconTemplate.png')

  const tray = new Tray(image)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
  tray.setToolTip('1W - Make your work better!')

  tray.on('click', () => {
    win.isVisible()?win.hide():win.show()
  })

  tray.on('right-click', () => {
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Item1', type: 'radio' },
      { label: 'Item2', type: 'radio' },
      { label: 'Item3', type: 'radio', checked: true },
      { label: 'Item4', type: 'radio' }
    ])
    tray.popUpContextMenu(contextMenu)
  })
})

ipcMain.handle("doSomethingAxios", async () => {
  let response = await axios.get("https://75yz8.mocklab.io/menus");
  response = JSON.parse(JSON.stringify(response.data))
  return response;
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

const { app, BrowserWindow, Tray, Menu } = require('electron')
const fetch = require('electron-fetch')
const path = require('path')

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

  const tray = new Tray('public/trayIconTemplate.png')
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

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

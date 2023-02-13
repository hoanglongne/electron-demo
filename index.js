const { app, BrowserWindow, Tray } = require('electron')
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
}

let tray = null;

app.whenReady().then(() => {
  createWindow()
  tray = new Tray('asset/Vector.png')
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
  tray.setToolTip('1W - Make your work better!')

  tray.on('click', () => {
    win.isVisible()?win.hide():win.show()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

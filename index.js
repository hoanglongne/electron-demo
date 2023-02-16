const { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain, MenuItem } = require('electron')
const path = require('path')
const axios = require("axios");

let win = null;
let apiPasteWin = null;


let contextMenu = Menu.buildFromTemplate([
  { label: 'About', id: 'About', type: 'submenu', submenu: []},
  { label: 'Settings', 
  type: 'normal', 
  click: () => {
    apiPasteWin.show()
  } 
},
])

function createWindow () {
  win = new BrowserWindow({
    width: 400,
    height: 600,
    resizable: false,
    fullscreenable: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile('index.html')

  apiPasteWin = new BrowserWindow({
    width:300,
    height: 150,
    parent: win,
    frame: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  apiPasteWin.loadFile('apiPasteModal.html')
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
    tray.popUpContextMenu(contextMenu)
  })
})

ipcMain.on("sendingURL", async(event, value) => {
  let response = await axios.get(value);
  response = JSON.parse(JSON.stringify(response.data))
  // win.webContents.send("getDataBack", response)

  // response.forEach((value) => {
  //   contextMenu.append(new MenuItem({label:value.name, submenu:value?.children?.name}))
  // })

  function handleSingleChat () {
    win.webContents.send("getDataBack", response)
  }

  contextMenu.append(new MenuItem({label: "Chat", type:"submenu", submenu: [{ label: "Single Chat", click: handleSingleChat }, { label: "Group Chat" }]}))
  contextMenu.append(new MenuItem({label: "Profile"}))
  // let MyItemElm = contextMenu.getMenuItemById("About");
  // MyItemElm.submenu.insert(0, new MenuItem({label:"Name"}));  
  // console.log(MyItemElm)
  apiPasteWin.hide()
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

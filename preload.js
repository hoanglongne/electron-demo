const { contextBridge, ipcRenderer } = require('electron')

  let indexBridge = {
  // doSomethingAxios: async() => {
  //     const result = await ipcRenderer.invoke("doSomethingAxios");
  //     const thing = document.getElementById("thing-to-display");
  //     thing.innerText = result[0].name
  // },
  sendingURL: (value) => ipcRenderer.send('sendingURL', value),
  getDataBack: (callback) => ipcRenderer.on('getDataBack', callback)
}

contextBridge.exposeInMainWorld("indexBridge", indexBridge);

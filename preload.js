const { contextBridge, ipcMain, ipcRenderer } = require('electron')

  let indexBridge = {
    doSomethingAxios: async() => {
      const result = await ipcRenderer.invoke("doSomethingAxios");
      const thing = document.getElementById("thing-to-display");
      thing.innerText = result[0].name
  },
}

contextBridge.exposeInMainWorld("indexBridge", indexBridge);
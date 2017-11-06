import { app, BrowserWindow } from 'electron';

let mainWindow: BrowserWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      backgroundThrottling: false
    }
  });
  // mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.loadURL(`http://localhost:8080/`);

  mainWindow.on('closed', () => {
    app.quit();
  });
});

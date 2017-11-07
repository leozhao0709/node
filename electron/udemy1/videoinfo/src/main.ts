import { app, BrowserWindow, ipcMain } from 'electron';
import { ffprobe, FfprobeData } from 'fluent-ffmpeg';

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

ipcMain.on('video:submit', (event: Event, path: string) => {
  ffprobe(path, (err, metadata: FfprobeData) => {
    // console.log(metadata.format.duration);
    mainWindow.webContents.send('video:metadata', metadata.format.duration);
  });
});

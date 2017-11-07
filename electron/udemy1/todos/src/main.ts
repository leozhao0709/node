import { app, BrowserWindow, Menu, MenuItemConstructorOptions, ipcMain } from 'electron';

let mainWindow: BrowserWindow;
let addWindow: BrowserWindow | null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    center: true,
    webPreferences: {
      backgroundThrottling: false
    }
  });
  // mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.loadURL(`http://localhost:8080/`);

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);

  mainWindow.on('closed', () => {
    app.quit();
  });
});

function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add New Todo',
    parent: mainWindow,
    center: true
  });
  addWindow.loadURL(`file://${__dirname}/../src/add.html`);

  addWindow.on('closed', () => {
    addWindow = null;
  });
}

ipcMain.on('todo:add', (event: Event, value: string) => {
  mainWindow.webContents.send('todo:add', value);
  addWindow!.close();
});

const menuTemplate: MenuItemConstructorOptions[] = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New Todo',
        accelerator: process.platform === 'darwin' ? 'cmd+n' : 'ctrl+n',
        click: createAddWindow
      },
      {
        label: 'Clear Todos',
        accelerator: process.platform === 'darwin' ? 'cmd+w' : 'ctrl+w',
        click: () => {
          mainWindow.webContents.send('todo:clear');
        }
      },
      {
        label: 'Quit',
        click() {
          app.quit();
        },
        accelerator: process.platform === 'darwin' ? 'cmd+q' : 'ctrl+q'
      }
    ]
  }
];

if (process.platform === 'darwin') {
  menuTemplate.unshift({});
}

if (process.env.NODE_ENV !== 'production') {
  menuTemplate.push({
    label: 'View',
    submenu: [
      {
        role: 'refresh'
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'cmd+alt+I' : 'ctrl+alt+i',
        click(item, focusedWindow) {
          focusedWindow.webContents.toggleDevTools();
        }
      }]
  });
}

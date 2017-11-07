import { ipcRenderer } from 'electron';

ipcRenderer.on('todo:add', (event: Event, value: string) => {
  const li = document.createElement('li');
  const text = document.createTextNode(value);

  li.appendChild(text);
  document.querySelector('ul')!.appendChild(li);
});

ipcRenderer.on('todo:clear', () => {
  document.querySelector('ul')!.innerHTML = '';
});

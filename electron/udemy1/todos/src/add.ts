import { ipcRenderer } from 'electron';

document.querySelector('form')!.addEventListener('submit', (event: Event) => {

  event.preventDefault();

  const value = document.querySelector('input')!.value;
  console.log(value);
  ipcRenderer.send('todo:add', value);
});

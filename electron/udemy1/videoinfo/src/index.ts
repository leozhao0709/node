
import { ipcRenderer } from 'electron';

const formElement = document.querySelector('form');

formElement!.addEventListener('submit', (event: Event) => {
  event.preventDefault();

  const inputElement = document.querySelector('input');
  const file = inputElement!.files![0];

  const filePath = file.path;
  // console.log(filePath);
  ipcRenderer.send('video:submit', filePath);
});

ipcRenderer.on('video:metadata', (event: Event, duration: number) => {
  console.log(typeof (duration));
  const h1Element = document.querySelector('#result')!;
  h1Element.innerHTML = `Video is ${duration} seconds`;
});

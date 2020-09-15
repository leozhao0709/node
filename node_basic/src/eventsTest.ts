import events from 'events';

const emitter = new events.EventEmitter();

// node event: newListener. Fires when a new listener start listen
emitter.once('newListener', (event, listener) => {
  console.log('newListener...', event);
});

emitter.on('myEvent', () => {
  console.log('listener1...');
});

emitter.on('myEvent', (...params) => {
  console.log('listener2...', ...params);
});

emitter.emit('myEvent', 'a', 'b');

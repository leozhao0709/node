import { trigger, state, style, transition, group, animate } from '@angular/animations';

export const buttonStateTrigger = trigger('buttonState', [
  state('valid', style({
    backgroundColor: 'lightgreen',
    borderColor: 'green',
    color: 'green'
  })),
  state('invalid', style({
    backgroundColor: 'red',
    borderColor: 'darkred',
    color: 'white'
  })),
  transition('invalid=>valid', [
    group([
      animate(100, style({
        transform: 'scale(1.1)'
      })),
      animate(200, style({
        backgroundColor: 'lightgreen'
      }))
    ]),
    animate(200, style({
      transform: 'scale(1)'
    }))
  ]),
  transition('valid=>invalid', [
    group([
      animate(100, style({
        transform: 'scale(1.1)'
      })),
      animate(200, style({
        backgroundColor: 'red'
      }))
    ]),
    animate(200, style({
      transform: 'scale(1)'
    }))
  ])
]);

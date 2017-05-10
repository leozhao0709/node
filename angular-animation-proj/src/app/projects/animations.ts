import { trigger, state, style, transition, animate } from '@angular/animations';

export const markedTrigger = trigger('markedState', [
  state('default', style({
    border: '1px solid black',
    backgroundColor: 'transparent',
    padding: '20px',
  })),
  state('marked', style({
    border: '2px solid blue',
    backgroundColor: '#caeff9',
    padding: '19px'
  })),
  transition('default=>marked', [
    style({
      border: '2px solid black',
      padding: '19px',
      transform: 'scale(1)'
    }),
    animate('200ms ease-out', style
      ({
        transform: 'scale(1.05)'
      })),
    animate(200)
  ]),
  transition('marked=>default', [
    style({
      border: '1px solid blue',
      padding: '20px'
    }),
    animate('300ms ease-out')
  ])
]);

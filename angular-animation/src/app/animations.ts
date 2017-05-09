import { trigger, state, style, transition, animate } from '@angular/animations';

export const clickedStateTrigger = trigger('clickedState', [
  state('default', style({
    backgroundColor: 'orange',
    width: '100px',
    height: '100px'
  })),
  state('clicked', style({
    backgroundColor: 'blue',
    width: '300px',
    height: '50px'
  })),
  state('mousedown', style({
    backgroundColor: 'red',
    border: '1px solid black',
    width: '100px',
    height: '100px'
  })),
  // 'time delay mode'
  // transition('default <-> clicked', animate('1s 500ms ease-in')),
  transition('default <=> clicked', animate(300)),
  transition('mousedown <=> clicked', animate(300)),
]);

export const numberEnteredStateTrigger = trigger('numberEnteredState', [
  state('unselected', style({
    border: '1px solid black',
    padding: '5px',
    backgroundColor: 'transparent'
  })),
  state('selected', style({
    border: '2px solid blue',
    padding: '4px',
    backgroundColor: 'lightblue'
  })),
  transition('unselected=>selected', [
    style({
      border: '2px solid black',
      padding: '4px'
    }),
    animate('2000ms 100ms ease-out', style({
      backgroundColor: 'red',
      transform: 'scale(1.05)'
    })),
    animate(2000)
  ])
]);

import { trigger, state, style, transition, animate, group, keyframes } from '@angular/animations';

//Note, important!!!: if use transform or opacity attribute, please make sure the html element style is display: block or inline-block

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

export const showStateTrigger = trigger('showState', [
  // transition('void=>*', [
  //   style({
  //     opacity: 0
  //   }),
  //   animate(300)]),
  // transition('*=>void', [
  //   animate(300, style({
  //     opacity: 0
  //   }))])

  // alias
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate(300)]),
  transition(':leave', [
    animate(300, style({
      opacity: 0
    }))])
]);

export const animateStateTrigger = trigger('animateState', [
  transition('*=>*', [
    animate(400, style({
      width: 0
    })),
    animate(400, style({
      // width: '100%'
      width: '*' // dynamic width
    }))
  ])
]);

export const listStateTrigger = trigger('listState', [
  // transition('void=>*', [
  //   style({
  //     opacity: 0
  //   }),
  //   animate(300)]),
  // transition('*=>void', [
  //   animate(300, style({
  //     opacity: 0
  //   }))])

  // alias
  transition(':enter', [
    style({
      opacity: 0,
      backgroundColor: '#fff'
    }),
    group([
      animate(1000, style({
        opacity: 0.7
      })),
      animate('5000ms ease-out', keyframes([
        style({
          backgroundColor: 'white',
          offset: 0
        }),
        style({
          backgroundColor: 'red',
          offset: 0.8
        }),
        style({
          backgroundColor: 'green',
          offset: 1
        })
      ]))
    ]),
    animate(300)]),
  transition(':leave', [
    animate(300, style({
      opacity: 0
    }))])
]);

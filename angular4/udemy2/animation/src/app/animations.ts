import { trigger, state, style, transition, animate } from '@angular/animations';

export const showStateTrigger = trigger('showState', [
  // transition('void => *', [
  //   style({
  //     opacity: 0
  //   }),
  //   animate('300ms')
  // ]),
  // transition('*=>void', [
  //   animate('300ms', style({
  //     opacity: 0
  //   }))
  // ])

  transition(':enter', [
    style({
      opacity: 0
    }),
    animate('300ms')
  ]),
  transition(':leave', [
    animate('300ms', style({
      opacity: 0
    }))
  ])
]);

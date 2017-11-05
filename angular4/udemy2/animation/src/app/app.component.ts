import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { showStateTrigger } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('clickedState', [
      state('default', style({
        backgroundColor: 'orange',
        width: '100px',
        height: '100px',
      })),
      state('clicked', style({
        backgroundColor: 'blue',
        width: '300px',
        height: '50px',
      })),
      state('mousedown', style({
        backgroundColor: 'red',
        border: '1px solid #000',
        width: '100px',
        height: '100px',
      })),
      transition('default <=> clicked', [animate('1s 500ms ease-in')]),
      transition('mousedown <=> *', [animate('2s')]),
    ]),
    showStateTrigger
  ]
})
export class AppComponent {
  divClicked = false;
  doAnimate = false;

  isShown = false;

  clickInfo = 'default';

  onClickSample() {
    this.clickInfo = 'clicked';
    setTimeout(() => {
      this.clickInfo = 'default';
    }, 3000);
  }
}

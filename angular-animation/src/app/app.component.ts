import { Component } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { clickedStateTrigger, numberEnteredStateTrigger, showStateTrigger, animateStateTrigger, listStateTrigger } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    clickedStateTrigger,
    numberEnteredStateTrigger,
    showStateTrigger,
    animateStateTrigger,
    listStateTrigger
  ]
})
export class AppComponent {
  clickInfo = 'default';
  paragraphClick = 'default';
  numberEntered = null;

  isShown = false;
  width = 400;
  animate = false;
  testResults = [];

  onClickSimple() {
    this.clickInfo = 'clicked';
    setTimeout(() => {
      this.clickInfo = 'default';
    }, 3000);
  }

  onMouseDown() {
    this.clickInfo = 'mousedown';
  }

  onAddElement() {
    this.testResults.push(Math.random());
  }

  onAnimationStart(event: AnimationEvent) {
    console.log(event);
  }

  onAnimationDone(event: AnimationEvent) {
    console.log(event);
  }
}

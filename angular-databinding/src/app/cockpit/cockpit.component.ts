import { Server } from '../shared/interface/serverInterface';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss']
})
export class CockpitComponent implements OnInit {

  @Output()
  serverCreated = new EventEmitter<Server>();
  @Output()
  blueprintCreated = new EventEmitter<Server>();

  // serverName = '';
  // serverContent = '';

  @ViewChild('serverContentInput')
  serverContentInput: ElementRef;

  constructor() {}

  ngOnInit() {}
  /**
   * onAddServer
   */
  public onAddServer(nameInput: HTMLInputElement) {

    const server = {
      type: 'server',
      // name: this.serverName,
      name: nameInput.value,
      // content: this.serverContent
      content: this.serverContentInput.nativeElement.value
    };
    this.serverCreated.emit(server);
  }

  /**
   * onAddBlueprint
   */
  public onAddBlueprint(nameInput: HTMLInputElement) {
    const server = {
      type: 'blueprint',
      // name: this.serverName,
      name: nameInput.value,
      // content: this.serverContent
      content: this.serverContentInput.nativeElement.value
    };
    this.blueprintCreated.emit(server);
  }


}



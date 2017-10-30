import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss']
})
export class CockpitComponent implements OnInit {

  @Output() serverCreated = new EventEmitter<{ type: string, name: string, content: string }>();
  @Output() blueprintCreated = new EventEmitter<{ type: string, name: string, content: string }>();

  newServerName = '';
  newServerContent = '';

  constructor() { console.log('constructor'); }

  ngOnInit() {
    console.log('ngOnInit');
  }

  onAddServer() {
    this.serverCreated.emit({
      type: 'server',
      name: this.newServerName,
      content: this.newServerContent,
    })
  }

  onAddBlueprint() {
    this.blueprintCreated.emit({
      type: 'blueprint',
      name: this.newServerName,
      content: this.newServerContent,
    })
  }
}

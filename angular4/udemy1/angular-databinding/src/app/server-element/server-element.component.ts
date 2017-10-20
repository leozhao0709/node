import { Component, OnInit, Input } from '@angular/core';
import { Server } from '../shared/interface/serverInterface';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.scss']
})
export class ServerElementComponent implements OnInit {
  @Input()
  server: Server;

  constructor() { }

  ngOnInit() {
  }

}


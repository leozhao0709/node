import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  // styleUrls: ['./name.component.css']
})
export class ServerComponent implements OnInit {
  serverId = 10;
  serverStatus = 'offline';
  constructor() { }

  ngOnInit() { }

  getServerStatus() {
    return this.serverStatus;
  }
}

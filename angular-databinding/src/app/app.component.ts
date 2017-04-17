import { Component } from '@angular/core';
import { Server } from './shared/interface/serverInterface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  serverElements = [];

  /**
   * onServerAdded
   */
  public onServerAdded(server: Server) {
    this.serverElements.push(server);
  }

  /**
   * onBlueprintAdded
   */
  public onBlueprintAdded(server: Server) {
    this.serverElements.push(server);
  }
}



import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  serverElements = [];

  onServerAdded(server: { type: string, name: string, content: string }) {
    this.serverElements.push(server);
  }

  onBlueprintAdded(blueprint: { type: string, name: string, content: string }) {
    this.serverElements.push(blueprint);
  }
}

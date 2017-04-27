import { Component } from '@angular/core';
import { ServerService } from './server.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  appName = this._serverService.getAppName();

  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];

  constructor(private _serverService: ServerService) { };

  onSaveServer() {
    this._serverService.storeServers(this.servers).subscribe(
      (response: Response) => {
        console.log(response);
      },
      (error: Error) => {
        console.log(error);
      },
    );
  }

  onGetServer() {
    this._serverService.getServers().subscribe(
      (servers) => {
        // console.log(servers);
        this.servers = servers;
      },
      (error: Error) => console.log(error)
    );
  }

  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }

  private generateId() {
    return Math.round(Math.random() * 10000);
  }
}

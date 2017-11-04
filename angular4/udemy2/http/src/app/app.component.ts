import { Response } from '@angular/http';
import { Component } from '@angular/core';
import { ServerService } from './server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
  constructor(private _serverService: ServerService, ) { }

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

  onSave() {
    this._serverService.storeServers(this.servers).subscribe(
      (res: Response) => {
        console.log(res);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  onGet() {
    this._serverService.getServers().subscribe(
      (data: any) => {
        this.servers = data;
      },
      (error: Error) => {
        console.log(error);
      }
    );
  }
}

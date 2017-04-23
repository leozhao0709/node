import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Router, Params, Data } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: { id: number, name: string, status: string };

  constructor(private serversService: ServersService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    // this._route.params.subscribe(
    //   (params: Params) => {
    //     const id = +this._route.snapshot.params['id'];
    //     this.server = this.serversService.getServer(id);
    //   }
    // );

    this._route.data
      .subscribe((data: Data) => {
        // this data is in app-router module resolver
        console.log(data);
        this.server = data['server'];
      });
  }

  onEdit() {
    this._router.navigate(['edit'], { relativeTo: this._route, queryParamsHandling: 'preserve' });
  }
}

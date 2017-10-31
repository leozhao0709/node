import { Component, OnInit } from '@angular/core';
import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {
  server: { id: number, name: string, status: string };

  constructor(private serversService: ServersService, private _activatedRoute: ActivatedRoute, private _router: Router, ) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params: Params) => {
      const id = +params['id'];
      this.server = this.serversService.getServer(id);
    });
  }

  onEdit() {
    this._router.navigate(['edit'], { relativeTo: this._activatedRoute, queryParamsHandling: 'preserve' });
  }
}

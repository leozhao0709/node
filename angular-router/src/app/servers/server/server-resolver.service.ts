import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ServersService } from '../servers.service';

interface Server {
  id: number;
  name: string;
  status: string;
}

@Injectable()
export class ServerResolverService implements Resolve<Server> {
  // tslint:disable-next-line:max-line-length
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Server | Observable<Server> | Promise<Server> {
    return this._serversService.getServer(+route.params['id']);
  }


  constructor(private _serversService: ServersService) { }

}

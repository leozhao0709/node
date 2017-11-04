import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ServerService {

  constructor(private _http: Http, ) { }

  storeServers(servers: any[]) {
    // const headers = new Headers({ 'Content-type': 'application/json' });
    // return this._http.post('https://ng-http-test.firebaseio.com/data.json', servers, {
    //   headers: headers
    // });

    const headers = new Headers({ 'Content-type': 'application/json' });
    return this._http.put('https://ng-http-test.firebaseio.com/data.json', servers, {
      headers: headers
    });
  }

  getServers() {
    return this._http.get('https://ng-http-test.firebaseio.com/data.jso').map(
      (res: Response) => {
        const data = res.json().map(
          (server) => {
            return { ...server, name: 'Fetched' + server.name };
          }
        );
        return data;
      }
    ).catch(
      (error: Response) => {
        return Observable.throw('Something went wrong');
      }
      );
  }

}

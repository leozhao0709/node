import { Response, Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServerService {

  constructor(private _http: Http) { }

  storeServers(servers: any[]) {
    const headers: Headers = new Headers({ 'Content-type': 'application/json' });
    // return this._http.post('https://ng-http-test.firebaseio.com/data.json', servers,
    //   { headers: headers });

    return this._http.put('https://ng-http-test.firebaseio.com/data.json', servers,
      { headers: headers });
  }

  getServers() {
    return this._http.get('https://ng-http-test.firebaseio.com/data.json')
      .map(
      (response: Response) => {
        const data: any = response.json();
        for (const server of data) {
          server.name = 'FETCHED_' + server.name;
        }
        return data;
      }
      )
      .catch(
      (error: Response) => {
        // console.log(error);
        return Observable.throw('Something went wrong');
      }
      );
  }

  getAppName() {
    return this._http.get('https://ng-http-test.firebaseio.com/appName.json')
      .map(
      (response: Response) => {
        return response.json();
      }
      );
  }
}

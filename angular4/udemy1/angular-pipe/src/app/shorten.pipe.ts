import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: any, limit: number = 10, args?: any): any {
    // return null;
    if ((<string>value).length > limit) {
      return (<string>value).substr(0, limit) + ' ...';
    }

    return value;
  }

}

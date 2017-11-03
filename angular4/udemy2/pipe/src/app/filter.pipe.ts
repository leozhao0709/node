import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  // pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: string[], filterString: string, propName: string, args?: any): any {
    if (value.length === 0 || filterString === '') {
      return value;
    }

    return value.filter((server) => {
      return server[propName].toLowerCase().includes(filterString.toLowerCase());
    });
  }

}

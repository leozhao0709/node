import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false /** pure to false will trigger dynamic change, which may lead performance issue*/
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string, args?: any): any {
    if (value.lenth === 0 || filterString === '') {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      if (item[propName].includes(filterString)) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}

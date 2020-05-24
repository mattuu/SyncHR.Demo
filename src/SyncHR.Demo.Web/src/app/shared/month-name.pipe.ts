import { Pipe, PipeTransform } from '@angular/core';
import { MONTHS } from './months';

@Pipe({
  name: 'monthName'
})
export class MonthNamePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return MONTHS.find(m => m.value === +value)?.label;
  }

}

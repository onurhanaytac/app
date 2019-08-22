import { Pipe } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'lira'
})
export class LiraPipe extends DecimalPipe {
  transform(value: number): any {
    let val = super.transform(value, "1.2-2");

  	!val ? val = "" : val;

    return "₺" + val.replace(/,/g, "#").replace(/\./g, ",").replace(/#/g, ".");
  }
}

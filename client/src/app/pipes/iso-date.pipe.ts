import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'isoDate'})
export class IsoDate implements PipeTransform {
  transform(value: any, exponent: string): string {
    const dateTime = moment(moment(value).format('DD.MM.YYYY') + ' ' + moment().format('HH:mm:ss'), 'DD.MM.YYYY HH:mm:ss').toISOString();
    return value;
  }
}
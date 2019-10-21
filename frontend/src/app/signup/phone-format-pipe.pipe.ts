import { Pipe, PipeTransform } from '@angular/core';
import { parsePhoneNumber, CountryCode } from 'libphonenumber-js/min';

@Pipe({
  name: 'phoneFormatPipe'
})
export class PhoneFormatPipePipe implements PipeTransform {

  transform(phoneValue: number | string , args?: any): any {
    try {
      const phoneNumber = parsePhoneNumber(phoneValue + '', 'US' as CountryCode);
      return phoneNumber.formatNational();
    } catch (error) {
      return phoneValue;
    }
  }

}


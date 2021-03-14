import { Pipe, PipeTransform } from '@angular/core';
import { _log } from '../services/constantes';

@Pipe({ name: 'phone' })
export class PhonePipe implements PipeTransform {
    // tslint:disable-next-line:typedef
    transform(value) {
        _log('pipe phone', value);
        if (value !== null && value !== undefined && value.length > 0) {
            return value.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/g, '(\$1) \$2 \$3.\$4');
        }

    }

}

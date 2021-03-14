import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'cpf' })
export class CPFPipe implements PipeTransform {
    // tslint:disable-next-line:typedef
    transform(value) {
        if (value !== null && value !== undefined && value.length > 0) {
            if (value !== null && value !== undefined && value.length <= 11) {
                return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3-\$4');
            } else {
                return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '\$1.\$2.\$3\/\$4\-\$5');
            }
        }
        return null;
    }

}

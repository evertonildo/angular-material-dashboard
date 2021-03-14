import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterItem',
    pure: false
})
export class FilterItemPipe implements PipeTransform {
    transform(items: any[], filter: string): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.Texto.indexOf(filter) === -1);
    }
}
import { NgModule } from '@angular/core';

import { KeysPipe } from './keys.pipe';
import { GetByIdPipe } from './getById.pipe';
import { HtmlToPlaintextPipe } from './htmlToPlaintext.pipe';
import { FilterPipe } from './filter.pipe';
import { CamelCaseToDashPipe } from './camelCaseToDash.pipe';
import { CNPJPipe} from './cnpj.pipe';
import { CPFPipe} from './cpf.pipe';
import { PhonePipe} from './phone.pipe';
import { FilterItemPipe } from './filter-item.pipe';
import { FilterMenuPipe } from './filter-menu.pipe';

@NgModule({
    declarations: [
        KeysPipe,
        GetByIdPipe,
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe,
        CNPJPipe, 
        CPFPipe, 
        PhonePipe,
        FilterItemPipe,
        FilterMenuPipe
        // CPFPipe,
        // CNPJPipe
    ],
    imports: [],
    exports: [
        KeysPipe,
        GetByIdPipe,
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe,
        CNPJPipe, 
        CPFPipe, 
        PhonePipe,
        FilterItemPipe,
        FilterMenuPipe
    ]
})
export class MyPipesModule {
}

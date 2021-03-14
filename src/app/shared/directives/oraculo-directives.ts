import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AccessControlDirective } from '../access-control/access-control.directive';
import { CredenciaisService } from '../access-control/credenciais.service';
import { DateMaskDirective, PhoneMaskDirective } from '../date-mask/phone-date-mask';
import { HideMeDirective } from '../hideme';
import { KzMaskDirective } from '../kzmask/kz-mask.directive';



@NgModule({
    declarations: [
        KzMaskDirective,
        AccessControlDirective,
        PhoneMaskDirective,
        DateMaskDirective,
        HideMeDirective
    ],
    imports: [],
    exports: [
        KzMaskDirective,
        AccessControlDirective,
        PhoneMaskDirective,
        DateMaskDirective,
        HideMeDirective
    ],
    providers: [CredenciaisService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OraculoDirectivesModule {
}

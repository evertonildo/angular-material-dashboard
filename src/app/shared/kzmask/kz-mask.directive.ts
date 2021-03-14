/**
 * Diretiva de máscara genérica em campo de texto.
 *
 * @author Márcio Casale de Souza <contato@kazale.com>
 * @since 0.0.4
 */

import { Directive, HostListener, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
    selector: '[kzMask]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: KzMaskDirective,
            multi: true
        }
    ]
})
export class KzMaskDirective implements ControlValueAccessor {
    onTouched: any;
    onChange: any;

    @Input('kzMask')
    kzMask: string;

    writeValue(value: any): void {}

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    @HostListener('keyup', ['$event'])
    onKeyup($event: any): void {
        let valor = $event.target.value.replace(/\D/g, '');
        // tslint:disable-next-line:prefer-const
        let pad = this.kzMask.replace(/\D/g, '').replace(/9/g, '_');
        // tslint:disable-next-line:prefer-const
        let valorMask = valor + pad.substring(0, pad.length - valor.length);

        // retorna caso pressionado backspace
        if ($event.keyCode === 8) {
            this.onChange(valor);
            return;
        }

        if (valor.length <= pad.length) {
            this.onChange(valor);
        }

        let valorMaskPos = 0;
        valor = '';
        for (let i = 0; i < this.kzMask.length; i++) {
            if (isNaN(parseInt(this.kzMask.charAt(i), 10))) {
                valor += this.kzMask.charAt(i);
            } else {
                valor += valorMask[valorMaskPos++];
            }
        }

        if (valor.indexOf('_') > -1) {
            valor = valor.substr(0, valor.indexOf('_'));
        }

        $event.target.value = valor;
    }

    @HostListener('blur', ['$event'])
    onBlur($event: any): void {
        if ($event.target.value.length === this.kzMask.length) {
            return;
        }
        this.onChange('');
        $event.target.value = '';
    }
}

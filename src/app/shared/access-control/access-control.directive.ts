import { CredenciaisService } from './credenciais.service';
import { OnInit } from '@angular/core';
import {
    Directive,
    ElementRef,
    Input,
} from '@angular/core';
import { ExternalService } from '../services/external.service';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[AccessControl]'
})
export class AccessControlDirective implements OnInit {
    // private group = GROUP_OPERATION_FILTER;
    public el: HTMLElement;
    constructor(
        public element: ElementRef,
        public services: ExternalService,
        private _cred: CredenciaisService
    ) {
        this.el = this.element.nativeElement;
        // // _console('el', this.el);

    }

    @Input() public objeto: string;
    @Input() public nivel: string;
    @Input() public rules: string[];
    @Input() public rulesSelect: string[];
    @Input() public field: string;
    @Input() public Forbidden: string[];

    public hiden: boolean;

    ngOnInit(): boolean {
        // tslint:disable-next-line:no-debugger
        // debugger;
        try {
            // // _console('access control for ' + this.navItem.title, 'rules', this.rules, 'navItem', this.navItem, 'user rules', this._cred.usuarioAutenticado.rules, this._cred.estaLogado());
        } catch (error) {
            // // _console('Apenas um aviso', error);
        }

        this.hiden = true;
        if (this.rules === null || this.rules === undefined) {
            this.rules = [];
        }

        if (this._cred.estaLogado()) {

            if (this.rules.length > 0) {

                // // _console('Perfis permitidos para a funcionalidade ', this.navItem.title, this.rules);
                /// Será ocultado o item se o perfil do usuário não estiver na lista dos permitidos
                this.rules.forEach(rule => {
                    if (this.hiden) {
                        this.hiden = rule !== this.services.Perfil;
                        try {
                            //  // _console('Permitido ', this.navItem.title, this.rules);
                        } catch (error) {
                            // _console('Apenas aviso ');
                        }

                    }
                });
                /// Será ocultado o item se o perfil do usuário estiver na lista dos negados
                if (this.Forbidden !== undefined) {
                    this.Forbidden.forEach(rule => {
                        if (!this.hiden) {
                            this.hiden = rule !== this.services.Perfil; 
                            //(this._cred.usuarioAutenticado.rules.indexOf(rule) >= 0);
                            try {
                                //  // _console('Porém negado para ', this.navItem.title, this._cred.usuarioAutenticado.rules);
                            } catch (error) {
                                // _console('Apenas aviso');
                            }

                        }
                    });
                }

            } else {

                this.hiden = true;
            }
            if (this.hiden) {
                // // _console('In AccessControlDirective  hidden');
                // this.el.setAttribute('style', 'visibility:hidden;');
                this.el.setAttribute('style', 'display:nome;');
                return false;
            }

        }
    }



    // ngOnChanges(changes: SimpleChanges) {
    //     if (changes.input) {

    //     }
    // }

    // @HostListener('window:keyup', ['$event'])
    // keyEvent(event: KeyboardEvent) {
    // }

    // @HostListener('window:focusout', ['$event'])
    // keyEvent(event: any) {
    //     this.checkEvent(event);
    // }

    // @HostListener('ngModelChange', ['$event'])
    // changeEvent(event: any) {
    //     this.checkEvent(event);
    // }

    // private checkEvent(event: any) {
    //     // this.el.tagName === 'MAT-SELECT'
    //     const data = !isNaN(event) || typeof event === 'string' || event instanceof String ? event : (<HTMLInputElement>this.el).value;
    //     const rule = new Rule(this.field, this.op, data);
    //     this.model.page = 1;
    //     if (!this.model.filters) {
    //         this.model.filters = new Filter(this.group.and, [rule]);
    //     } else {
    //         if (this.model.filters.groups && this.model.filters.groups.length) {
    //             this.model.filters.groups.map(f => this.checkRules(f.rules, rule));
    //         } else {
    //             this.checkRules(this.model.filters.rules, rule);
    //         }
    //     }
    // }

    // private checkRules(rules: Rule[], rule: Rule) {
    //     const criteria = (x: Rule) => x.field === rule.field && x.op === rule.op;
    //     if (!rules.some(criteria)) {
    //         rules.push(rule);
    //     } else {
    //         rules.filter(criteria).map(x => x.data = rule.data);
    //     }
    // }
}


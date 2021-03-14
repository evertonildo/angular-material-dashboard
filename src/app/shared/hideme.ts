import { Directive, Input, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[HideMe]'
})
export class HideMeDirective implements AfterViewInit {

    @Input() HideMe: string;

    constructor(
        private el: ElementRef
    ) { }

    ngAfterViewInit() {
        // _console('HideMe', this.HideMe);
        if (this.HideMe === 'hide' || this.HideMe === 'importacao') {
            this.el.nativeElement.style.display = 'none';
        }
        // should be displayed
        // this.el.nativeElement.style.display = 'none';
    }
}
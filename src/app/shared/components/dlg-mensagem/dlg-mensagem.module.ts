import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DlgMensagemComponent } from './dlg-mensagem.component';



@NgModule({
  declarations: [DlgMensagemComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,

  ], exports: [DlgMensagemComponent],
  entryComponents: [DlgMensagemComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DlgMensagemModule { }

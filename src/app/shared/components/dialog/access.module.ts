import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccessComponent } from './access.component';



@NgModule({
  declarations: [AccessComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,

  ], exports: [AccessComponent],
  entryComponents:[AccessComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccessModule { }

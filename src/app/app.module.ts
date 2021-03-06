import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { AssuntosComponent } from './pages/assuntos/assuntos.component';
import { ChamadosComponent } from './pages/chamados/chamados.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AccessModule } from './shared/components/dialog/access.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatExpansionModule, MatCheckboxModule, MatIconModule } from '@angular/material';
import { ExternalService } from './shared/services/external.service';
import { HttpClientModule } from '@angular/common/http';
import { EndpointsModule } from './pages/endpoints/endpoints.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OraculoDirectivesModule } from './shared/directives/oraculo-directives';
import { MyPipesModule } from './shared/pipes/pipes.module';
import { MaterialModulos } from './material-modulos.module';
import { TicketsComponent } from './pages/tickets/tickets.component';

@NgModule({
  declarations: [
    AppComponent,
    AssuntosComponent,
    ChamadosComponent,
    TicketsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    AccessModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule,
    MatExpansionModule,
    MatCheckboxModule,
    EndpointsModule,
    OraculoDirectivesModule,
    MyPipesModule,
    MaterialModulos,
    MatIconModule
  ],
  exports: [OraculoDirectivesModule, MyPipesModule, MaterialModulos],
  providers: [
    ExternalService,
    // { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    // { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: 'LOCALSTORAGE', useFactory: getLocalStorage },
    { provide: MAT_DIALOG_DATA, useValue: [] },
    { provide: MatDialogRef, useValue: {} },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getLocalStorage(): any {
  return typeof window !== 'undefined' ? window.localStorage : null;
}

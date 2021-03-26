import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { AssuntosComponent } from './pages/assuntos/assuntos.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatExpansionModule, MatCheckboxModule, MatIconModule, MatSnackBarModule } from '@angular/material';
import { ExternalService } from './shared/services/external.service';
import { HttpClientModule } from '@angular/common/http';
import { EndpointsModule } from './pages/endpoints/endpoints.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OraculoDirectivesModule } from './shared/directives/oraculo-directives';
import { MyPipesModule } from './shared/pipes/pipes.module';
import { MaterialModulos } from './material-modulos.module';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { DlgMensagemModule } from './shared/components/dlg-mensagem/dlg-mensagem.module';
import { AccessComponent } from './shared/components/dialog/access.component';
import { BuscaClienteDialogComponent } from './shared/components/busca-cliente-dialog/busca-cliente-dialog.component';
import { ChamadosComponent } from './pages/chamados/chamados.component';

@NgModule({
  declarations: [
    AppComponent,
    AssuntosComponent,
    TicketsComponent,
    AccessComponent,
    BuscaClienteDialogComponent,
    ChamadosComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    EndpointsModule,
    OraculoDirectivesModule,
    MyPipesModule,
    MaterialModulos,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatIconModule,
    DlgMensagemModule,
  ],
  exports: [OraculoDirectivesModule, MyPipesModule, BuscaClienteDialogComponent],
  entryComponents: [AccessComponent, BuscaClienteDialogComponent],
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

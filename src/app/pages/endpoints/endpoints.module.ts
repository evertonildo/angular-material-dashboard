import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MaterialModulos } from 'src/app/material-modulos.module';
import { MatIconModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { EndpointsComponent } from './endpoints.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MyPipesModule } from 'src/app/shared/pipes/pipes.module';



@NgModule({
  declarations: [EndpointsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModulos,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    FlexLayoutModule ,
    MyPipesModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EndpointsModule { }

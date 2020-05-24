import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MonthNamePipe } from './month-name.pipe';

const MAT_MODULES = [
  MatSliderModule,
  MatSlideToggleModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatCardModule,
  MatChipsModule,
  MatDividerModule
]

const MODULES_FOR_REEXPORT = [
  FormsModule,
  RouterModule,
  HttpClientModule,
  ReactiveFormsModule,
  FlexLayoutModule
]

@NgModule({
  declarations: [MonthNamePipe],
  imports: [
    CommonModule,
    ...MODULES_FOR_REEXPORT,
    ...MAT_MODULES
  ],
  exports: [
    ...MODULES_FOR_REEXPORT,
    ...MAT_MODULES,
    MonthNamePipe
  ]
})
export class SharedModule { }

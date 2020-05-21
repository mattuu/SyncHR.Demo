import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';

const MAT_MODULES = [
  MatSliderModule,
  MatTableModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ...MAT_MODULES
  ],
  exports: [
    FormsModule,
    ...MAT_MODULES
  ]
})
export class SharedModule { }

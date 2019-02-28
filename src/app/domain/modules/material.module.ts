import {NgModule} from '@angular/core';
import {
  MatTableModule,
  MatTooltipModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatMenuModule,
  MatDialogModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatFormFieldModule,
  MatStepperModule,
  MatDividerModule
} from '@angular/material';

@NgModule({
  imports: [
    MatTableModule,
    MatTooltipModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatFormFieldModule,
    MatStepperModule,
    MatDividerModule
  ],
  exports: [
    MatTableModule,
    MatTooltipModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatFormFieldModule,
    MatStepperModule,
    MatDividerModule
  ]
})
export class MaterialModule {
}

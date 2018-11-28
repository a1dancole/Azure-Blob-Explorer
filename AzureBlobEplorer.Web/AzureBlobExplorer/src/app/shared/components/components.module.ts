import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatMenuModule, MatIconModule, MatFormFieldModule, MatTableModule, MatInputModule, MatPaginatorModule, MatDialogModule, MatTooltipModule, MatSnackBarModule } from '@angular/material';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    MatButtonModule, 
    MatCheckboxModule, 
    MatToolbarModule, 
    MatMenuModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatTableModule, 
    MatInputModule, 
    MatPaginatorModule, 
    MatDialogModule, 
    MatTooltipModule,
    MatFileUploadModule,
    MatSnackBarModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    MatButtonModule, 
    MatCheckboxModule, 
    MatToolbarModule, 
    MatMenuModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatTableModule, 
    MatInputModule, 
    MatPaginatorModule, 
    MatDialogModule, 
    MatTooltipModule,
    MatFileUploadModule,
    MatSnackBarModule,
    CommonModule,
    FormsModule
  ],
})
export class ComponentsModule { }
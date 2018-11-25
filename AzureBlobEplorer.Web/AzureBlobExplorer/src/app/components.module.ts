import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatMenuModule, MatIconModule, MatFormFieldModule, MatTableModule, MatInputModule, MatPaginatorModule, MatDialogModule, MatTooltipModule } from '@angular/material';
import { NgModule } from '@angular/core';

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
    MatTooltipModule  
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
    MatTooltipModule
  ],
})
export class ComponentsModule { }
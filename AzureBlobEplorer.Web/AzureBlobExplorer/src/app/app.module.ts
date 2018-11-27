import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { BlobExplorerModule } from './blobExplorer/blobExplorer.module';
import { SharedModule } from './shared/shared.module'
import { ContainerExplorerModule } from './containerExplorer/containerExplorer.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
    // Our own mobules
    SharedModule.forRoot(),
    BlobExplorerModule,
    ContainerExplorerModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components.module';
import { SettingsService } from './shared/settings/settings.service';
import { BlobExplorerComponent } from './blobExplorer/blobExplorer.component';
import { HttpClient } from './shared/httpClient/httpClient.service';
import { BlobExplorerService } from './blobExplorer/services/blobExplorer.service';
import { HttpModule } from '@angular/http';
import { ViewBlobComponent } from './blobExplorer/viewBlob/viewBlob.component';
import { SafeUrlPipe } from './shared/safeUrlPipe/safeUrl.pipe';
import { UploadBlobComponent } from './blobExplorer/uploadBlob/blobUploader.component';
import { MatFileUploadModule } from 'angular-material-fileupload';

export function initApp(settingsService: SettingsService) {
  return () => settingsService.initialise();
}

@NgModule({
  declarations: [
    AppComponent,
    BlobExplorerComponent,
    ViewBlobComponent,
    UploadBlobComponent,
    SafeUrlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
    ComponentsModule,
    MatFileUploadModule 
  ],
  providers: [
    HttpClient,
    SettingsService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [SettingsService],
      multi: true
    },
    BlobExplorerService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ViewBlobComponent,
    UploadBlobComponent
  ],
})
export class AppModule { }

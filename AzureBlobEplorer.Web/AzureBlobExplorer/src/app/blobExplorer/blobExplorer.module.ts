import { NgModule } from '@angular/core';
import { ViewBlobComponent } from './viewBlob/viewBlob.component'
import { UploadBlobComponent } from './uploadBlob/blobUploader.component'
import { BlobExplorerComponent } from './blobExplorer.component'
import { BlobExplorerService } from './services/blobExplorer.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ BlobExplorerComponent, ViewBlobComponent, UploadBlobComponent ],
  imports: [ SharedModule ],
  providers: [ BlobExplorerService ],
  exports: [ ],
  entryComponents: [ ViewBlobComponent, UploadBlobComponent ],
})
export class BlobExplorerModule { }
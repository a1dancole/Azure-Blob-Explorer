import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UploadBlobComponent } from './blobExplorer/uploadBlob/blobUploader.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'AzureBlobExplorer';
  constructor(private _dialog: MatDialog) {

  }
  public uploadBlob() {
    const dialog = this._dialog.open(UploadBlobComponent, {
    });
    dialog.afterClosed().subscribe(result => { })
  }
}

import { Component, Inject } from "@angular/core";
import {MAT_DIALOG_DATA} from '@angular/material';
import { BlobExplorerService } from "../services/blobExplorer.service";

@Component({
    selector: "view-blob-dialog",
    templateUrl: "./viewBlob.component.html",
    styleUrls: ['./viewBlob.component.sass']
})
export class ViewBlobComponent {
    public url: string;
    public fileName: string;
    public contentType: string;

    constructor(@Inject(MAT_DIALOG_DATA) private data: any, private _blobExplorerService: BlobExplorerService) {
        this.url = this._blobExplorerService.buildDownloadBlobInlineUrl(data.containerName, data.blob.fileName);
        this.fileName = data.blob.fileName;
    }
}

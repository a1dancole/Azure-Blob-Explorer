import { Component, Inject } from "@angular/core";
import { BlobExplorerService } from "../services/blobExplorer.service";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: "blob-uploader-dialog",
    templateUrl: "./blobUploader.component.html",
    styleUrls: ['./blobUploader.component.sass']
})
export class UploadBlobComponent {
    public uploadUrl: string;

    constructor(@Inject(MAT_DIALOG_DATA) private data: any, private _blobExplorerService: BlobExplorerService) {
        this.uploadUrl = this._blobExplorerService.buildUploadBlobUrl(data.containerName);
    }
}
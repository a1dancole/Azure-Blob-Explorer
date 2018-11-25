import { OnInit, Component } from "@angular/core";
import { BlobExplorerService } from "./services/blobExplorer.service";
import { BlobDetail } from "./models/blobdetail";
import { MatDialog } from '@angular/material';
import { ViewBlobComponent } from "./viewBlob/viewBlob.component";

@Component({
    selector: 'blob-explorer',
    templateUrl: './blobExplorer.component.html',
    styleUrls: ['./blobExplorer.component.sass']
})
export class BlobExplorerComponent implements OnInit {

    blobDetails?: BlobDetail[];
    blobDetailsTableColumns: string[] = ['name', 'createdTime', 'lastModified', 'actions'];
    supportedMimes: string[] = ['image/png', 'text/plain'];

    constructor(private _blobExplorerService: BlobExplorerService, private _dialog: MatDialog) {

    }

    ngOnInit() {
        this.retrieveBlobDetails();
    }

    public viewBlob(blob: BlobDetail) {
        const dialog = this._dialog.open(ViewBlobComponent, {
            data: {
                blob: blob
            }
        });
        dialog.afterClosed().subscribe(result => { })
    }

    public downloadBlob(blob: BlobDetail) {
        return this._blobExplorerService.downloadBlob(blob.fileName);
    }

    public deleteBlob(blob: BlobDetail) {
        this._blobExplorerService.deleteBlob(blob.fileName).subscribe(response => {
            this.retrieveBlobDetails();
        });
    }

    public canDisplayInBrowser(blob: BlobDetail) : boolean {
        var response = this.supportedMimes.some(o => o === blob.contentType) || Array.prototype.reduce.call(navigator.plugins, function (supported, plugin) {
            return supported || Array.prototype.reduce.call(plugin, function (supported, mime) {
                return supported ||  mime.type == blob.contentType;
            }, supported);
        }, false);

        return response;
    }

    private retrieveBlobDetails() {
        this._blobExplorerService.getAllBlobs().subscribe(response => {
            this.blobDetails = response;
        })
    }
}
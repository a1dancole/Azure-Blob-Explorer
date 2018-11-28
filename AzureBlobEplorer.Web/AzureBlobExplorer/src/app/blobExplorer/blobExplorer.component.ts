import { OnInit, Component } from "@angular/core";
import { BlobExplorerService } from "./services/blobExplorer.service";
import { BlobDetail } from "./models/blobDetail";
import { MatDialog, MatSnackBar } from '@angular/material';
import { ViewBlobComponent } from "./viewBlob/viewBlob.component";
import { Router, ActivatedRoute } from "@angular/router";
import { UploadBlobComponent } from "./uploadBlob/blobUploader.component";

@Component({
    selector: 'blob-explorer',
    templateUrl: './blobExplorer.component.html',
    styleUrls: ['./blobExplorer.component.sass']
})
export class BlobExplorerComponent implements OnInit {

    public blobDetails?: BlobDetail[];
    public blobDetailsTableColumns: string[] = ['name', 'createdTime', 'lastModified', 'actions'];
    public containerName: string;
    private supportedMimes: string[] = ['image/png', 'text/plain'];

    constructor(private _blobExplorerService: BlobExplorerService, private _dialog: MatDialog, private _router: Router, private _activatedRoute: ActivatedRoute, private _snackBar: MatSnackBar) {
        this.containerName = this._activatedRoute.snapshot.params['containerName']
    }

    ngOnInit() {
        this.retrieveBlobDetails();
    }

    public viewBlob(blob: BlobDetail) {
        const dialog = this._dialog.open(ViewBlobComponent, {
            data: {
                containerName: this.containerName,
                blob: blob
            }
        });
        dialog.afterClosed().subscribe(x => { })
    }

    public uploadBlob() {
        const dialog = this._dialog.open(UploadBlobComponent, {
            data: {
                containerName: this.containerName
            }
        });
        dialog.afterClosed().subscribe(x => { 
            this.retrieveBlobDetails();
            this._snackBar.open('File Uploaded', '', {duration: 500 })
         })
    }

    public downloadBlob(blob: BlobDetail): void {
        return this._blobExplorerService.downloadBlob(this.containerName, blob.fileName);
    }

    public deleteBlob(blob: BlobDetail): void {
        this._blobExplorerService.deleteBlob(this.containerName, blob.fileName).subscribe(x => {
            this.retrieveBlobDetails();
            this._snackBar.open(blob.fileName + ' Deleted', '', {duration: 500 })
        });
    }

    public canDisplayInBrowser(blob: BlobDetail) : boolean {
        var response = this.supportedMimes.some(o => o === blob.contentType) || Array.prototype.reduce.call(navigator.plugins, function (supported, plugin) {
            return supported || Array.prototype.reduce.call(plugin, function (supported, mime) {
                return supported || mime.type == blob.contentType;
            }, supported);
        }, false);

        return response;
    }

    public back(): void {
        this._router.navigate(['']) ;
    }

    private retrieveBlobDetails() {
        this._blobExplorerService.getAllBlobs(this.containerName).subscribe(x => {
            this.blobDetails = x;
        })
    }
}
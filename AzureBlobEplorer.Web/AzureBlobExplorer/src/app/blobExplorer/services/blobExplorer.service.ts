import { Injectable } from "@angular/core";
import { HttpClient } from "../../shared/httpClient/httpClient.service";
import { BlobDetail } from "../models/blobDetail";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ResponseContentType } from "@angular/http";
import { saveAs } from 'file-saver';

@Injectable()
export class BlobExplorerService {
    constructor(private _httpClient: HttpClient) { }

    public getAllBlobs(containerName: string): Observable<BlobDetail[]> {
        return this._httpClient.get("getallblobs/" + containerName).pipe(map(response => <BlobDetail[]>response.json()))
    }

    public getBlob(containerName: string, blobName: string): Observable<BlobDetail> {
        return this._httpClient.get("getblob/" + containerName + blobName).pipe(map(response => <BlobDetail>response.json()))
    }

    public downloadBlob(containerName: string, blobName: string): void {
        this._httpClient.get("downloadBlob/" + containerName + "/" + blobName, { responseType: ResponseContentType.Blob })
            .subscribe((response: any) => {
                saveAs(response.blob(), blobName);
            });
    }

    public deleteBlob(containerName: string, blobName: string): Observable<any> {
        return this._httpClient.delete("deleteBlob/" + containerName + "/" + blobName).pipe(map(response => response))
    }

    public buildDownloadBlobInlineUrl(containerName: string, blobName: string): string {
        return this._httpClient.getUrl("downloadblobinline/" + containerName + "/" + blobName)
    }

    public buildUploadBlobUrl(containerName: string): string {
        return this._httpClient.getUrl("createBlob/" + containerName)
    }
}
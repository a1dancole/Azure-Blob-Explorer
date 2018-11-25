import { Injectable } from "@angular/core";
import { HttpClient } from "../../shared/httpClient/httpClient.service";
import { BlobDetail } from "../models/blobdetail";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ResponseContentType } from "@angular/http";
import { saveAs } from 'file-saver';

@Injectable()
export class BlobExplorerService {
    constructor(private _httpClient: HttpClient) {

    }

    public getAllBlobs(): Observable<BlobDetail[]> {
        return this._httpClient.get("getallblobs").pipe(map(response => <BlobDetail[]>response.json()))
    }

    public getBlob(blobName: string): Observable<BlobDetail> {
        return this._httpClient.get("getblob/" + blobName).pipe(map(response => <BlobDetail>response.json()))
    }

    public downloadBlob(blobName: string) {
        this._httpClient.get("downloadBlob/" + blobName, { responseType: ResponseContentType.Blob })
            .subscribe((response: any) => {
                saveAs(response.blob(), blobName);
            });
    }

    public deleteBlob(blobName: string): Observable<any> {
        return this._httpClient.delete("deleteBlob/" + blobName).pipe(map(response => response))
    }

}
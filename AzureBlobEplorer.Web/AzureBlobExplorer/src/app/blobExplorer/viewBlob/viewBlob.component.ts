import { Component, Inject } from "@angular/core";
import { Http } from "@angular/http";
import {MAT_DIALOG_DATA} from '@angular/material';
import { SettingsService } from "../../shared/settings/settings.service";

@Component({
    selector: "view-blob-dialog",
    templateUrl: "./viewBlob.component.html",
    styleUrls: ['./viewBlob.component.sass']
})
export class ViewBlobComponent {
    public url: string;
    public fileName: string;
    public contentType: string;

    constructor(@Inject(MAT_DIALOG_DATA) private data: any, private _http: Http, private _settingsService: SettingsService) {
        this.url = this._settingsService.settings.apiUrl + "downloadblobinline/" + data.blob.fileName + "?code=" + this._settingsService.settings.apiKey;
        this.fileName = data.blob.fileName;
    }
}

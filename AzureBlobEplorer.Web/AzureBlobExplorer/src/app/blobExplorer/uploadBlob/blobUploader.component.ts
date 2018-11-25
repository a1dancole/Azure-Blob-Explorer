import { Component, Inject } from "@angular/core";
import { SettingsService } from "../../shared/settings/settings.service";

@Component({
    selector: "blob-uploader-dialog",
    templateUrl: "./blobUploader.component.html",
    styleUrls: ['./blobUploader.component.sass']
})
export class UploadBlobComponent {
    public uploadUrl: string;

    constructor(private _settingsService: SettingsService) {
        this.uploadUrl = this._settingsService.settings.apiUrl + "createblob" + "?code=" + this._settingsService.settings.apiKey
    }
}
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http"
import { Settings } from "./settings.model";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class SettingsService {
    public settings: Settings;

    private _settingsSubject: BehaviorSubject<Settings> = new BehaviorSubject<Settings>(null);

    constructor(private _http: Http) { }

    public initialise(): Promise<any> {
        return this.getSettings();
    }

    private getSettings() {
        return this._http.get('./assets/settings/settings.json')
        .pipe(map((response: Response) => this.setSettings(<Settings>response.json())))
        .toPromise<any>();
    }

    private setSettings(settings: Settings) {
        this.settings = settings;
    }
}
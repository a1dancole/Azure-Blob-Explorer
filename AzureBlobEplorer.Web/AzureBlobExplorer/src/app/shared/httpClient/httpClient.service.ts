import { Injectable } from "@angular/core";
import { Http, XHRBackend, RequestOptions, RequestOptionsArgs, Headers, Response } from "@angular/http";
import { Router } from "@angular/router";
import { SettingsService } from "../settings/settings.service"
import { Observable } from "rxjs";

@Injectable()
export class HttpClient extends Http {
    constructor(backend: XHRBackend, defaultOptions: RequestOptions, private _router: Router, private _settingsService: SettingsService) {
        super(backend, defaultOptions);
        defaultOptions.withCredentials = false;
    }

    public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.get(this.buildUrl(url), this.buildRequestOptions(options));
    }

    public post(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.post(this.buildUrl(url), this.buildRequestOptions(options));
    }

    public put(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.put(this.buildUrl(url), this.buildRequestOptions(options));
    }

    public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.delete(this.buildUrl(url), this.buildRequestOptions(options));
    }

    public getUrl(url:string): string {
        return this.buildUrl(url)
    }

    private buildUrl(requestUrl :string): string {
        return this._settingsService.settings.apiUrl + requestUrl + "?code=" + this._settingsService.settings.apiKey;
    }

    private buildRequestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
        if(options == null) {
            options = new RequestOptions();
        }
        if(options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.append('Content-Type', 'application/json');
        return options;
    }
}
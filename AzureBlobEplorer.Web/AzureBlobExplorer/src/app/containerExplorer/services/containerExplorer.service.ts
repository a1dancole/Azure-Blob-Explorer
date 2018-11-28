import { Injectable } from "@angular/core";
import { HttpClient } from "../../shared/httpClient/httpClient.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ResponseContentType } from "@angular/http";
import { ContainerDetail } from '../models/containerDetail'
import { container } from "@angular/core/src/render3";

@Injectable()
export class ContainerExplorerService {
    constructor(private _httpClient: HttpClient) { }

    public getAllContainers(): Observable<ContainerDetail[]> {
        return this._httpClient.get("getallcontainers").pipe(map(response => <ContainerDetail[]>response.json()))
    }

    public createContainer(containerName: string): Observable<boolean> {
        return this._httpClient.post("createcontainer/" + containerName).pipe(map(response => <boolean>response.json()))
    }

    public deleteContainer(containerName: string): Observable<boolean> {
        return this._httpClient.delete("deletecontainer/" + containerName).pipe(map(response => <boolean>response.json()))
    }
}
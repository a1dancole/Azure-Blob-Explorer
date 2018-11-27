import { Component } from "@angular/core";
import { ContainerExplorerService } from "../services/containerExplorer.service";
import { MatDialogRef } from "@angular/material";

@Component({
    selector: "create-container-dialog",
    templateUrl: "./createContainer.component.html",
    styleUrls: ['./createContainer.component.sass']
})
export class CreateContainerComponent {
    public containerName?: string;

    constructor(private _containerExplorerService: ContainerExplorerService, private _dialogRef: MatDialogRef<CreateContainerComponent>) { }

    public isContainerNameEmpty(): boolean {
        return this.containerName == null || this.containerName == '';
    }
    public createContainer() {
        this._containerExplorerService.createContainer(this.containerName).subscribe(x => {
                this._dialogRef.close();
        })
    }
}
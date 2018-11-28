import { OnInit, Component } from "@angular/core";
import { ContainerExplorerService } from "./services/containerExplorer.service";
import { ContainerDetail } from "./models/containerDetail";
import { Router } from "@angular/router";
import { MatDialog, MatSnackBar } from "@angular/material";
import { CreateContainerComponent } from "./createContainer/createContainer.component";

@Component({
    selector: 'container-explorer',
    templateUrl: './containerExplorer.component.html',
    styleUrls: ['./containerExplorer.component.sass']
})
export class ContainerExplorerComponent implements OnInit {
    public containerDetails: ContainerDetail[];
    public containerDetailsTableColumns: string[] = ['icon', 'name', 'lastModified', 'actions'];

    constructor(private _containerExplorerService: ContainerExplorerService, private _router: Router, private _dialog: MatDialog, private _snackBar: MatSnackBar) { }

    ngOnInit() {
        this.retrieveContainerDetails();
    }

    public viewContainer(container: ContainerDetail) {
        this._router.navigate(['/viewContainer', container.name])
    }

    public addContainer() {
        const dialog = this._dialog.open(CreateContainerComponent, {
        });
        dialog.afterClosed().subscribe(x => { 
            this.retrieveContainerDetails(); 
            this._snackBar.open('Folder Created', '', {duration: 500 });
        })
    }

    public deleteContainer(element: ContainerDetail) {
        this._containerExplorerService.deleteContainer(element.name).subscribe(x => { 
            this.retrieveContainerDetails(); 
            this._snackBar.open('Folder Deleted', '', {duration: 500 });
        })
    }

    private retrieveContainerDetails() {
        this._containerExplorerService.getAllContainers().subscribe(x => {
            this.containerDetails = x;
        })
    }
}
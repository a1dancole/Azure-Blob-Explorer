import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ContainerExplorerService } from './services/containerExplorer.service';
import { ContainerExplorerComponent } from './containerExplorer.component';
import { CreateContainerComponent } from './createContainer/createContainer.component'

@NgModule({
  declarations: [ ContainerExplorerComponent, CreateContainerComponent ],
  imports: [ SharedModule ],
  providers: [ ContainerExplorerService ],
  exports: [ ],
  entryComponents: [ CreateContainerComponent ],
})
export class ContainerExplorerModule { }
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent} from './app.component'
import { BlobExplorerComponent } from './blobExplorer/blobExplorer.component'
import { ContainerExplorerComponent } from './containerExplorer/containerExplorer.component';

const routes: Routes = [
  { path: '', component: ContainerExplorerComponent},
  { path: 'viewContainer/:containerName', component: BlobExplorerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

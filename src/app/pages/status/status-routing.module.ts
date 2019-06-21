import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatusListComponent } from './status-list/status-list.component';
import { StatusFormComponent } from './status-form/status-form.component';

const routes: Routes = [
  { path: '', component: StatusListComponent },
  { path: 'novo', component: StatusFormComponent },
  { path: ':id/editar', component: StatusFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatusRoutingModule { }

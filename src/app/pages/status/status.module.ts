import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { StatusRoutingModule } from './status-routing.module';
import { StatusListComponent } from './status-list/status-list.component';
import { StatusFormComponent } from './status-form/status-form.component';

@NgModule({
  declarations: [StatusListComponent, StatusFormComponent],
  imports: [
    SharedModule,
    StatusRoutingModule
  ]
})
export class StatusModule { }

import { Component } from '@angular/core';

import { BaseResourceListComponent } from 'src/app/shared/components/base-list/base-resource-list.component';

import { Status } from '../classes/status.model';
import { StatusService } from '../classes/status.service';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.css']
})
export class StatusListComponent extends BaseResourceListComponent<Status> {

  constructor(protected statusService: StatusService) {
    super(statusService)
  }

}

import { Injectable, Injector } from '@angular/core';
import { BaseReourceService } from 'src/app/shared/services/base-resource.service';
import { Status } from './status.model';

@Injectable({
  providedIn: 'root'
})
export class StatusService extends BaseReourceService<Status> {

  constructor(protected injector: Injector) {
    super("status", injector, Status.fromJson)
   }
}

import { Injectable, Injector } from '@angular/core';

import { BaseReourceService } from 'src/app/shared/services/base-resource.service';
import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseReourceService<Entry> {

  constructor(protected injector: Injector) { 
    super("lancamentos", injector, Entry.fromJson)
  } 
}
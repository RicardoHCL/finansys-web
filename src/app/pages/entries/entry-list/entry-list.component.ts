import { Component } from '@angular/core';

import { BaseResourceListComponent } from 'src/app/shared/components/base-list/base-resource-list.component';

import { Entry } from '../classes/entry.model';
import { EntryService } from '../classes/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent extends BaseResourceListComponent<Entry> {

  constructor(protected entryService: EntryService) {
    super(entryService)
  }

}

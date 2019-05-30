import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { EntryListComponent } from './entry-list/entry-list.component';

import { CalendarModule } from "primeng/calendar";
import { IMaskModule } from "angular-imask";

@NgModule({
  declarations: [EntryFormComponent, EntryListComponent],
  imports: [
    IMaskModule,
    SharedModule,
    CalendarModule,
    EntriesRoutingModule
  ]
})
export class EntriesModule { }

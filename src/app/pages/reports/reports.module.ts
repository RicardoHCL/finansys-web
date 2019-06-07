import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { ChartModule } from "primeng/chart";
import { CalendarModule } from "primeng/calendar";

import { ReportsComponent } from './reports/reports.component';
import { ReportsRoutingModule } from './reports-routing.module';

@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    ChartModule,
    SharedModule,
    CalendarModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }

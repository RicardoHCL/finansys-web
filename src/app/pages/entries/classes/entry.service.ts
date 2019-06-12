import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs';
import { Entry } from './entry.model';
import { map, catchError } from 'rxjs/operators';
import { BaseReourceService } from 'src/app/shared/services/base-resource.service';
import { Config } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseReourceService<Entry> {

  apiPathReports = new Config().apiPath("relatorios");

  constructor(protected injector: Injector) {
    super("lancamentos", injector, Entry.fromJson)
  }

  getReportsForPeriods(initialDate: string, finalDate: string): Observable<Entry[]> {
    const url = `${this.apiPathReports}/${initialDate}/${finalDate}`;
    return this.http.get(url).pipe(
        map(this.jsonDataToResource.bind(this)),
        catchError(this.handleError)
    )
  }
}
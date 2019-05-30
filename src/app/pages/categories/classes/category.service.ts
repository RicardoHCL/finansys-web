import { Injectable, Injector } from '@angular/core';

import { BaseReourceService } from 'src/app/shared/services/base-resource.service';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseReourceService<Category> {

  constructor(protected injector: Injector) {
    super("categorias", injector, Category.fromJson)
  }
}

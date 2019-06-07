import { Component } from '@angular/core';

import { BaseResourceListComponent } from 'src/app/shared/components/base-list/base-resource-list.component';

import { Category } from '../classes/category.model';
import { CategoryService } from '../classes/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent extends BaseResourceListComponent<Category> {

  constructor(protected categoryService: CategoryService) {
    super(categoryService)
   }

}
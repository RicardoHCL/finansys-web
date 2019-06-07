import { Component, Injector } from '@angular/core';
import { Validators } from "@angular/forms";

import { Category } from '../classes/category.model';
import { CategoryService } from '../classes/category.service';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-form/base-resource-form.component';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category> {

  constructor(protected injector: Injector, protected categoryService: CategoryService) {
    super(injector, new Category(), categoryService, Category.fromJson)
  }

  // Protected Methods (Overrides)

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      descricao: [null, [Validators.required, Validators.minLength(3)]]
    })
  }

  // Custom Messages (Overrides)

  protected creationPageTitle(): string {
    return "Cadastro de Categoria"
  }

  protected editionPageTitle(): string {
    return "Atualizar Categoria"
  }

  protected previewPageTitle(): string {
    return "Vizualizar Categoria"
  }

  protected creationMessageSuccess(): string {
    return "Categoria cadastrada com sucesso!"
  }

  protected editionMessageSuccess(): string {
    return "Categoria atualizada com sucesso!"
  }

  protected creationMessageError(): string {
    return "Ocorreu um erro ao tentar cadastrar a categoria."
  }

  protected editionMessageError(): string {
    return "Ocorreu um erro ao tentar atualizar a categoria."
  }

}

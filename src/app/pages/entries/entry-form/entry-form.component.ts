import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from "@angular/forms";

import { Util } from 'src/app/shared/utils/util';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-form/base-resource-form.component';

import { Entry } from '../classes/entry.model';
import { Status } from '../classes/status.model';
import { Category } from '../../categories/classes/category.model';

import { EntryService } from '../classes/entry.service';
import { StatusService } from '../classes/status.service';
import { CategoryService } from '../../categories/classes/category.service';

import toastr from "toastr"
import * as $ from 'jquery';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit {

  // Variables Global

  categories: Array<Category>;
  status: Array<Status>;

  constructor(
    protected injector: Injector,
    protected entryService: EntryService,
    protected categoryService: CategoryService,
    protected statusService: StatusService
  ) {
    super(injector, new Entry(), entryService, Entry.fromJson)
  }

  // Override in ngOnInit

  ngOnInit() {
    this.loadCategories();
    this.loadSatatus();
    super.ngOnInit();
    this.disableOrEnableSelect();
  }

  // Especific Methods (Public)

  imaskConfig = Util.imaskConfig();

  numberConfig = {
    mask: Number
  }

  ptBr = Util.calendarPtBr();

  // Especific Methods (Private)

  private loadCategories() {
    return this.categoryService.getAll().subscribe(
      categories => this.categories = categories
    )
  }

  private loadSatatus() {
    return this.statusService.getAll().subscribe(
      status => this.status = status
    )
  }

  private disableOrEnableSelect() {
    if (this.currentAction == 'preview') {
      $("#categoriaId").prop("disabled", true);
      $("#statusId").prop("disabled", true);
    }
  }

  // Overrides Methods

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      descricao: [null, [Validators.required, Validators.minLength(3)]],
      categoria: [null],
      categoriaId: [null, Validators.required],
      valor: [null, Validators.required],
      data: [null, Validators.required],
      parcelado: [false],
      qntParcelas: [null],
      vlrParcelas: [null],
      status: [null],
      statusId: [null, Validators.required],
      despesa: [true, Validators.required]
    })
  }

  submitForm() {
    const qntParcelasNull = this.resourceForm.get('qntParcelas').value == null || this.resourceForm.get('qntParcelas').value == '';
    const vlrParcelasNull = this.resourceForm.get('vlrParcelas').value == null || this.resourceForm.get('vlrParcelas').value == '';

    if (this.resourceForm.get('parcelado').value == true && qntParcelasNull) {
      toastr.error("Campo Quantidade de Parcelas Obrigatório!");
    } else if (this.resourceForm.get('parcelado').value == true && vlrParcelasNull) {
      toastr.error("Campo Valor de Cada Parcela Obrigatório!");
    }
    else {
      super.submitForm();
    }
  }

  // Overrides Custom Messages

  protected creationPageTitle(): string {
    return "Cadastro de Lançamento"
  }

  protected editionPageTitle(): string {
    return "Atualizar Lançamento"
  }

  protected previewPageTitle(): string {
    return "Vizualizar Lançamento"
  }

  protected creationMessageSuccess(): string {
    return "Lançamento cadastrado com sucesso!"
  }

  protected editionMessageSuccess(): string {
    return "Lançamento atualizado com sucesso!"
  }

  protected creationMessageError(): string {
    return "Ocorreu um erro ao tentar cadastrar o Lançamento."
  }

  protected editionMessageError(): string {
    return "Ocorreu um erro ao tentar atualizar o Lançamento."
  }

}
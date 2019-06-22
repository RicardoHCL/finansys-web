import { Component, Injector } from '@angular/core';
import { Validators } from "@angular/forms";

import { BaseResourceFormComponent } from 'src/app/shared/components/base-form/base-resource-form.component';
import { Status } from '../classes/status.model';
import { StatusService } from '../classes/status.service';

@Component({
  selector: 'app-status-form',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.css']
})
export class StatusFormComponent extends BaseResourceFormComponent<Status> {

  constructor(protected injector: Injector, protected statusService: StatusService) {
    super(injector, new Status(), statusService, Status.fromJson)
  }

  // Protected Methods (Overrides)

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      descricao: [null]
    })
  }

  // Custom Messages (Overrides)

  protected creationPageTitle(): string {
    return "Cadastro de Status"
  }

  protected editionPageTitle(): string {
    return "Atualizar Status"
  }

  protected previewPageTitle(): string {
    return "Vizualizar Status"
  }

  protected creationMessageSuccess(): string {
    return "Status cadastrado com sucesso!"
  }

  protected editionMessageSuccess(): string {
    return "Status atualizado com sucesso!"
  }

  protected creationMessageError(): string {
    return "Ocorreu um erro ao tentar cadastrar o status."
  }

  protected editionMessageError(): string {
    return "Ocorreu um erro ao tentar atualizar o status."
  }

}
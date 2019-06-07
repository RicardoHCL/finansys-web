import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseReourceService } from '../../services/base-resource.service';

import toastr from "toastr";
import { switchMap } from "rxjs/operators";


export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

    // Variables Global

    currentAction: string;
    resourceForm: FormGroup;
    pageTitle: string;
    serverErrorMessage: any;
    submittingForm: boolean = false;

    // Variables Protected

    protected route: ActivatedRoute;
    protected router: Router;
    protected formBuilder: FormBuilder;

    constructor(
        protected injector: Injector,
        public resource: T,
        protected resourceService: BaseReourceService<T>,
        protected jsonDataToResourceFn: (jsonData: any) => T
    ) {
        this.route = this.injector.get(ActivatedRoute);
        this.router = this.injector.get(Router);
        this.formBuilder = this.injector.get(FormBuilder);
    }

    // Public Methods

    ngOnInit() {
        this.setCurrentAction();
        this.buildResourceForm();
        this.loadResource();
    }

    ngAfterContentChecked() {
        this.setPageTitle();
    }

    submitForm() {

        this.submittingForm = true;

        if (this.currentAction == "new") {
            this.createResource();
        } else {
            this.updateResource();
        }
    }

    getResourceId(): number {
        return this.resource.id;
    }

    // Abstract Methods

    protected abstract buildResourceForm(): void;

    // Protected Methods

    protected setCurrentAction() {

        if (this.route.snapshot.url[0].path == "novo") {
            this.currentAction = "new"
        } else if (this.route.snapshot.url[1].path == "editar") {
            this.currentAction = "edit"
        }else {
            this.currentAction = "preview"
        }
    }   

    protected loadResource() {
        if (this.currentAction != "new") {
            this.route.paramMap.pipe(
                switchMap(params => this.resourceService.getById(+params.get("id")))
            ).subscribe(
                (resource) => {
                    this.resource = resource;
                    this.resourceForm.patchValue(resource); //Bind no formulário do recurso após ser consultado
                },
                (error) => alert('Ocorreu um erro no servidor, tente novamente mais tarde.')
            )
        }
    }

    protected setPageTitle() {
        if (this.currentAction == "new") {
            this.pageTitle = this.creationPageTitle();
        } else if (this.currentAction == "edit") {
            this.pageTitle = this.editionPageTitle();
        }else {
            this.pageTitle = this.previewPageTitle();
        }
    }

    protected createResource() {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

        this.resourceService.create(resource).subscribe(
            resource => this.actionsForSuccess(resource),
            error => this.actionsForError(error)
        )
    }

    protected updateResource() {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

        this.resourceService.update(resource).subscribe(
            resource => this.actionsForSuccess(resource),
            error => this.actionsForError(error)
        )
    }

    protected actionsForSuccess(resource: T) {

        if (this.currentAction == "new") {
            toastr.success(this.creationMessageSuccess())
        } else {
            toastr.success(this.editionMessageSuccess())
        }

        const baseComponentPath: string = this.route.snapshot.parent.url[0].path;

        //Forçar redirecionamento para atualizar o formulário após cadastrar/atualizar um recurso
        this.router.navigateByUrl(baseComponentPath, { skipLocationChange: true }).then(
            () => this.router.navigate([baseComponentPath, resource.id, "editar"])
        )
    }

    protected actionsForError(error: any) {

        if (this.currentAction == "new") {
            toastr.error(this.creationMessageError())
        } else {
            toastr.error(this.editionMessageError())
        }

        this.submittingForm = false;
        this.serverErrorMessage = error;
    }

    // Custom Messages

    protected creationPageTitle(): string {
        return "Cadastro"
    }

    protected editionPageTitle(): string {
        return "Atualização"
    }

    protected previewPageTitle(): string {
        return "Vizualição"
    }

    protected creationMessageSuccess(): string {
        return "Cadastrado com sucesso!"
    }

    protected editionMessageSuccess(): string {
        return "Atualizado com sucesso!"
    }

    protected creationMessageError(): string {
        return "Falha ao cadastrar!"
    }

    protected editionMessageError(): string {
        return "Falha ao atualizar!"
    }

}
import { OnInit } from '@angular/core';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseReourceService } from '../../services/base-resource.service';

export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

    // Variables Global

    resources: T[] = [];

    constructor(protected resourceService: BaseReourceService<T>) { }

    ngOnInit() {
        this.resourceService.getAll().subscribe(
            resources => this.resources = resources.sort((a, b) => b.id - a.id),
            error => alert("Erro ao carregar a página")
        )
    }

    delete(resource: T) {

        const confirmation = confirm('Deseja realmente excluir esse registro?');
        if (confirmation) {

            this.resourceService.delete(resource.id).subscribe(
                () => this.resources = this.resources.filter(element => element != resource),
                () => alert('Erro ao tentar excluir')
            )
        }
    }
    
}
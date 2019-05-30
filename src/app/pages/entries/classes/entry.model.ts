import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Category } from '../../categories/classes/category.model';
import { Status } from './status.model';
import { Util } from 'src/app/shared/utils/util';



export class Entry extends BaseResourceModel{
    constructor(
        public id?: number,
        public nome?: string,
        public descricao?: string,
        public categoriaId?: number,
        public categoria?: Category,
        public valor?: string,
        public data?: string,
        public parcelado?: boolean,
        public qntParcelas?: number,
        public vlrParcelas?: string,
        public statusId?: number,
        public status?: Status,
        public despesa?: boolean
    ){
        super();
    }

    static fromJson(jsonData: any): Entry {
        return Object.assign(new Entry(), jsonData);
    }

    get textType(): string {
        return this.despesa ? 'Despesa' : 'Receita';
    }

    get columnValue(): string {
        return Util.formatReal(this.parcelado ? this.vlrParcelas : this.valor);
    }    
}
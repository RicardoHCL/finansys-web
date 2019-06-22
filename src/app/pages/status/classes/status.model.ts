import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Status extends BaseResourceModel{
    constructor(
        public id?: number,
        public nome?:string,
        public descricao?: string
    ){
        super();
    }

    static fromJson(jsonData: any): Status {
        return Object.assign(new Status(), jsonData);
    }
}
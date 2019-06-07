
export class Config {
    constructor(
        public production_url = "https://api-financas-prod.herokuapp.com/",
        public development_url = "http://localhost:8080/",

        private isProduction  = false,   
    ){}

    apiPath(resource: string): string{
        if(this.isProduction){
            return this.production_url + resource;
        }else{
            return this.development_url + resource;
        }
    }
}
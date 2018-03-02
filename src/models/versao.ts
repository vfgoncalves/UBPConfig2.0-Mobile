export class Versao {

    public $key: string;

    constructor(
        public id: string,
        public name: string,
        public dataPrevista: Date,
        public versaLiberada: boolean
    ) {}

}
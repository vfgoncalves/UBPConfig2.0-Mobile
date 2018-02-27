export class Cliente {
    public $key: string;
    
    constructor(
        public id: string,
        public nome: string,
        public email: string,
        public sistemas: string[]           
    ) {}
}

export class Artefato {

    public $key: string;

    constructor(
        public id: string,
        public idVersao: string,
        public name: string,
        public url: string
    ) {}

}
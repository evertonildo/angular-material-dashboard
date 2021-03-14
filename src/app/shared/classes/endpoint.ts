export class EndPoint {

    constructor(
        public Id: number,
        public LicenciadaId: number = null,
        public CNPJ: string = "",
        public NumeroFone: string = "",
        public Servico: string = "",
        public UrlRoot: string = "",
        public EndPoint: string = "",
        public Ativo: string = "S",
        public EhBotao = true, 
        public UserId: number = null,
        public UserName: string = "") {
    }
}
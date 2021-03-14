export class Chamado {
    constructor(public Id: number,
        public TargetPhone: string,
        public SourcePhone: string,
        public LicenciadaId: number,
        public ClienteId: number,
        public Requester: string = "",
        public ExportarDados: string = "",
        public RequesterPhone: string = "",
        public ContractId: number = null,
        public AvaliableServices: string = "",
        public Observations: string = "",
        public AssuntoId: number = null,
        public SolicitanteFuncaoId: number =null
    ) {

    }
}
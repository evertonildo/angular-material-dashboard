import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Chamado } from 'src/app/shared/classes/chamado';
import { DlgMensagemComponent } from 'src/app/shared/components/dlg-mensagem/dlg-mensagem.component';
import { _log } from 'src/app/shared/services/constantes';
import { ExternalService } from 'src/app/shared/services/external.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chamados',
  templateUrl: './chamados.component.html',
  styleUrls: ['./chamados.component.scss']
})
export class ChamadosComponent implements OnInit {
  registro: Chamado;
  formGroup: FormGroup;
  targetPhone: string;
  sourcePhone: string;
  callCLiente: any;
  licenciada: any;
  clienteChamador: any;
  numeroChamador: any;
  numeroChamado: any;
  contratos: any[];
  assuntos: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = [
    "Id",
    "Data",
    "Licenciada",
    // "TargetPhone",
    "Cliente",
    // "SourcePhone",
    "Requester",
    "Assunto",
    "Usuario",
    "LinkId",
    "acao",
  ];
  dataSource;

  buttons: any[];
  registros: any[];
  calledPhones: any[];
  selectedPhone: string;
  endpoints: any[];
  funcoes: any[];
  linkId: number;
  habilitarSolicitacaoAtendimento: boolean;
  habilitarSolicitacaoRemocao: boolean;
  habilitarSolicitacaoTeleconsulta: boolean;

  constructor(private services: ExternalService,
    private route: ActivatedRoute,
    private _fb: FormBuilder) {
    document.title = 'Chamados - CCS';
    this.contratos = [];

    this.habilitarSolicitacaoAtendimento = false;
    this.habilitarSolicitacaoRemocao = false;
    this.habilitarSolicitacaoTeleconsulta = false;

    if (this.route.snapshot.params.id !== undefined) {
      this.targetPhone = this.route.snapshot.params.id.split('.')[0];
      this.sourcePhone = this.route.snapshot.params.id.split('.')[1];
    }
    this.linkId = 0;
    this.registro = new Chamado(0, this.targetPhone, this.sourcePhone, 0, 0);
    this.createFormGroup();
  }
  createFormGroup() {
    this.formGroup = this._fb.group({
      TargetPhone: new FormControl(this.registro.TargetPhone, [Validators.required]),
      SourcePhone: new FormControl(this.registro.SourcePhone, [Validators.required]),
      LicenciadaId: new FormControl(this.registro.LicenciadaId, [Validators.required]),
      ClienteId: new FormControl(this.registro.ClienteId, [Validators.required]),
      Requester: new FormControl(this.registro.Requester, [Validators.required]),
      ExportarDados: new FormControl(this.registro.ExportarDados),
      RequesterPhone: new FormControl(this.registro.RequesterPhone, [Validators.required]),
      ContractId: new FormControl(this.registro.ContractId),
      AvaliableServices: new FormControl(this.registro.AvaliableServices),
      Observations: new FormControl(this.registro.Observations),
      AssuntoId: new FormControl(this.registro.AssuntoId, [Validators.required]),
      SolicitanteFuncaoId: new FormControl(this.registro.SolicitanteFuncaoId, [Validators.required])
    });
  }

  selectedPhoneNumber(event: any) {
    console.log('selectedPhoneNumber', event);
    this.listar(event);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.inicializacao();
    if (this.route.snapshot.params.id !== undefined) {

      this.numeroChamado = this.route.snapshot.params.id.split('.')[0];
      this.numeroChamador = this.route.snapshot.params.id.split('.')[1];
      this.services.endpointByPhone(this.numeroChamado).subscribe(r => {
        this.licenciada = r.registro;
        console.log('buscaEndpoint', this.licenciada);

        let dadosBusca = {
          CNPJ: this.licenciada.CNPJ,
          UrlRoot: this.licenciada.UrlRoot,
          EndPoint: this.licenciada.EndPoint,
          numeroChamador: this.numeroChamador
        };
        /**Buscar todos os endpoints do numero chamado */
        this.services.httpGet('endpointList/' + this.numeroChamado)
          .subscribe(r => {
            this.endpoints = r.lista;
            this.habilitarSolicitacaoAtendimento = (this.endpoints.find(end => end.Servico === 'Abrir Atendimento') !== undefined);
            this.habilitarSolicitacaoRemocao = (this.endpoints.find(end => end.Servico === 'Abrir Remocao') !== undefined);
            this.habilitarSolicitacaoTeleconsulta = (this.endpoints.find(end => end.Servico === 'Abrir Teleconsulta') !== undefined);
            _log('endpoints', this.endpoints)
          }, erro => console.log(erro));

        ///  http://ec2-54-232-5-124.sa-east-1.compute.amazonaws.com/callcenter
        this.services.buscaClienteChamadorNaLicenciada(dadosBusca).subscribe(r => {
          console.log('buscaClienteChamadorNaLicenciada 2', r);
          //if (r.registro === undefined) {
          //  this.clienteChamador = { Id: 1, Nome: 'Não Identificado', ComoEhConhecido:'Não Identificado' }
          //} else
          this.clienteChamador = r.registro;
          console.log('clienteChamador', this.clienteChamador);
          if (this.clienteChamador === undefined) {
            this.clienteChamador = { Id: 1, Nome: 'Não Identificado', ComoEhConhecido: 'Não Identificado' };
            this.registerCustomerService(1, this.licenciada.LicenciadaId, this.numeroChamador, this.numeroChamado);
          } else {
            dadosBusca = {
              CNPJ: environment.cnpjCentral,
              UrlRoot: this.licenciada.UrlRoot,
              EndPoint: this.licenciada.EndPoint,
              numeroChamador: this.numeroChamador
            };

            this.services.verificaSeClienteCadastradoNaCentral(dadosBusca).subscribe(clienteCentral => {
              console.log('clienteCentral', clienteCentral);

              if (clienteCentral.registro === undefined && this.clienteChamador !== undefined) {

                this.services.postCadastraClienteNaCentral(this.clienteChamador).subscribe(r => {
                  console.log('postCadastraClienteNaCentral', r);
                  if (r.registro !== undefined) {
                    this.callCLiente = r.registro;
                    this.registerCustomerService(this.callCLiente.pk_sacado, this.licenciada.LicenciadaId, this.numeroChamador, this.numeroChamado);
                  }

                }, erro => console.log(erro));
              } else {
                // clienteCentral.registro = this.clienteChamador;
                this.registerCustomerService(1, this.licenciada.LicenciadaId, this.numeroChamador, this.numeroChamado);
              }
            }, erro => console.log(erro));
          }
        }, erro => console.log(erro));
      }, erro => console.log(erro));
    }
  }
  inicializacao() {
    this.services.httpGet('getlistcombo/AssuntoChamada')
      .subscribe(r => {
        this.assuntos = r;
      }, erro => console.log(erro));

    this.services.httpGet('callednumbers')
      .subscribe(r => {
        this.calledPhones = r.lista;
      }, erro => console.log(erro));
    this.services.httpGet('getlistcombo/FuncaoSolicitante')
      .subscribe(r => {
        this.funcoes = r;
        _log('funcoes', this.funcoes);
      }, erro => console.log(erro));

  }

  listar(phoneNumber: string) {
    this.services.httpGet('customer-services/' + phoneNumber)
      .subscribe(r => {
        console.log('listar', r);
        this.registros = r.lista;
        this.dataSource = new MatTableDataSource(this.registros);
        this.dataSource.paginator = this.paginator;
      }, erro => console.log(erro));
  }

  /**
   * 
   * @param clienteId Id do cliente
   * @param licenciadaId Id da Licenciada
   * @param numeroChamador Número do cliente
   * @param numeroChamado Número chamado da licenciada 
   */
  registerCustomerService(clienteId: any, licenciadaId: any, numeroChamador: any, numeroChamado: any) {
    this.registro.ClienteId = clienteId;
    this.registro.LicenciadaId = licenciadaId;
    this.registro.SourcePhone = numeroChamador;
    this.registro.TargetPhone = numeroChamado;
    let capsula = {
      metodo: ' new-customer-service',
      registro: this.registro
    };

    console.log('capsula', capsula);

    this.services.httpPost('customer-service', capsula)
      .subscribe(r => {
        console.log('retorno new customer-service', r);
        this.services.buscaCustomerService(r.registro.pk_customer_service)
          .subscribe(r => {
            this.registro = r.registro;
            console.log('registro', this.registro);
            this.createFormGroup();
            this.listar(this.numeroChamado);
          }, erro => console.log(erro));

        console.log('retorno new', r, this.registro);
      }, erro => console.log(erro));
  }

  solicitarAtendimento() {
    let funcao = this.funcoes.find(x => x.Id === this.registro.SolicitanteFuncaoId);
    _log('funcao', funcao);
    _log('registro', this.registro);
    let capsula = {
      registro: {
        SolicitanteFoneCel: this.registro.RequesterPhone,
        SolicitanteNome: this.registro.Requester,
        Status: 'A',
        Observacao: this.registro.Observations,
        SolicitanteFuncaoId: `corporativo.fnc_getdominioid('${funcao.Texto}', 'FuncaoSolicitante')`,
        TipoLigacaoId: "corporativo.fnc_getdominioid('Solicita Atendimento', 'TipoLigacao')",
        PrestadoraId: `corporativo.fnc_getsacadobycnpjid('${this.licenciada.CNPJ}')`,
        ClienteId: this.registro.ClienteId === 1 ? "corporativo.fnc_getsacadobycnpjid('00000000000000')" : 1,
        ContratoId: this.registro.ContractId,
        SolicitanteFoneFixo: this.registro.SourcePhone,
        CallCenterId: this.registro.Id
      }
    }
    // protocolo de cancelamneto da gazeta do povo 2082212
    this.services.httpPost('triagem', capsula, this.services.getHeaders('cnpj', this.licenciada.CNPJ))
      .subscribe(r => {
        _log('retorno solicita atendimento', r);
        this.linkId = r.registro.Atendimento.pk_atendimento;
        
        this.services.httpPut('customer-service-link/' + this.registro.Id, {
          registro: {
            AtendimentoId: r.registro.Atendimento.pk_atendimento
          }
        })
          .subscribe(rr =>
            this.services.snackBar.open('Chamado atualizado com o ID #' + r.registro.Atendimento.pk_atendimento, 'Atendimento', {
              duration: 60000
            }).afterDismissed()
              .subscribe(s => {
                _log('afterDismissed');
                document.close();
              }));

      }, erro => console.log(erro));
  }

  solicitarRemocao() {
    let funcao = this.funcoes.find(x => x.Id === this.registro.SolicitanteFuncaoId);
    _log('funcao', funcao);
    _log('registro', this.registro);
    let capsula = {
      registro: {
        SolicitanteFoneCel: this.registro.RequesterPhone,
        SolicitanteNome: this.registro.Requester,
        Status: 'A',
        Observacao: this.registro.Observations,
        SolicitanteFuncaoId: `corporativo.fnc_getdominioid('${funcao.Texto}', 'FuncaoSolicitante')`,
        TipoLigacaoId: "corporativo.fnc_getdominioid('REMOÇÃO', 'TipoLigacao')",
        PrestadoraId: `corporativo.fnc_getsacadobycnpjid('${this.licenciada.CNPJ}')`,
        ClienteId: this.registro.ClienteId === 1 ? "corporativo.fnc_getsacadobycnpjid('00000000000000')" : this.registro.ClienteId,
        ContratoId: this.registro.ContractId,
        SolicitanteFoneFixo: this.registro.SourcePhone,
        CallCenterId: this.registro.Id
      }
    }

    this.services.httpPost('triagem', capsula, this.services.getHeaders('cnpj', this.licenciada.CNPJ))
      .subscribe(r => {
        _log('retorno solicita remoção', r);
        
        this.linkId = r.registro.Atendimento.pk_atendimento;
        this.services.httpPut('customer-service-link/' + this.registro.Id, {
          registro: {
            AtendimentoId: r.registro.Atendimento.pk_atendimento
          }
        })
          .subscribe(rr =>
            this.services.snackBar.open('Chamado atualizado com o ID #' + r.registro.Atendimento.pk_atendimento,
              'Remoção', {
              duration: 60000
            }).afterDismissed()
              .subscribe(s => {
                _log('afterDismissed');
                document.close();
              }));

      }, erro => console.log(erro));
  }

  solicitarTeleconsulta() {
    let funcao = this.funcoes.find(x => x.Id === this.registro.SolicitanteFuncaoId);
    _log('funcao', funcao);
    _log('registro', this.registro);
    let capsula = {
      registro: {
        SolicitanteFoneCel: this.registro.RequesterPhone,
        SolicitanteNome: this.registro.Requester,
        Status: 'A',
        Observacao: this.registro.Observations,
        SolicitanteFuncaoId: `corporativo.fnc_getdominioid('${funcao.Texto}', 'FuncaoSolicitante')`,
        TipoLigacaoId: "corporativo.fnc_getdominioid('Teleconsulta', 'TipoLigacao')",
        PrestadoraId: `corporativo.fnc_getsacadobycnpjid('${this.licenciada.CNPJ}')`,
        ClienteId: this.registro.ClienteId === 1 ? "corporativo.fnc_getsacadobycnpjid('00000000000000')" : this.registro.ClienteId,
        ContratoId: this.registro.ContractId,
        SolicitanteFoneFixo: this.registro.SourcePhone,
        CallCenterId: this.registro.Id
      }
    }

    this.services.httpPost('triagem', capsula, this.services.getHeaders('cnpj', this.licenciada.CNPJ))
      .subscribe(r => {
        _log('retorno solicita teleconsulta', r);
        
        this.linkId = r.registro.Atendimento.pk_atendimento;
        this.services.httpPut('customer-service-link/' + this.registro.Id, {
          registro: {
            AtendimentoId: r.registro.Atendimento.pk_atendimento
          }
        })
          .subscribe(rr =>
            this.services.snackBar.open('Chamado atualizado com o ID #' + r.registro.Atendimento.pk_atendimento, 'Teleconsulta', {
              duration: 60000
            }).afterDismissed()
              .subscribe(s => {
                _log('afterDismissed');
                document.close();
              }));

      }, erro => console.log(erro));
  }

  private prepareToSave(formModel: Chamado): void {
    this.registro = { ...this.registro, ...formModel };
  }

  salvar(formModel: Chamado) {
    const erros = this.services.findInvalidControls(this.formGroup);

    if (erros.length === 0) {
      this.prepareToSave(formModel);
      const capsula = { metodo: 'novo endpoint', registro: this.registro };
      capsula.registro = this.registro;
      console.log('capsula', capsula);
      this.services.httpPut("customer-service/" + this.registro.Id, capsula)
        .subscribe(r => {
          console.log('retorno update', r);
          this.services.buscaCustomerService(r.registro.pk_customer_service)
            .subscribe(r => {
              this.registro = r.registro;
              console.log('registro', this.registro);
              this.createFormGroup();
            }, erro => console.log(erro));
        });

    } else {
      _log("falhou findInvalidControls");

      return;
    }
  }
}

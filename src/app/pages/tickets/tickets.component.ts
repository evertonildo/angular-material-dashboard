import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from 'src/app/shared/classes/tickts';
import { _log } from 'src/app/shared/services/constantes';
import { ExternalService } from 'src/app/shared/services/external.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  registro: Ticket;
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
    "acao",
  ];
  dataSource;

  buttons: any[];
  registros: any[];
  calledPhones: any[];
  selectedPhone: string;

  constructor(private services: ExternalService,
    private route: ActivatedRoute,
    private _fb: FormBuilder) {
    document.title = 'Chamados - CCS';
    this.contratos = [];
    if (this.route.snapshot.params.id !== undefined) {
      this.targetPhone = this.route.snapshot.params.id.split('.')[0];
      this.sourcePhone = this.route.snapshot.params.id.split('.')[1];
    }
    this.registro = new Ticket(0);
    this.createFormGroup();
  }
  createFormGroup() {
    this.formGroup = this._fb.group({
      LicenciadaId: new FormControl(this.registro.LicenciadaId, [Validators.required]),
      Funcionalidade: new FormControl(this.registro.Funcionalidade),
      Descricao: new FormControl(this.registro.Descricao, [Validators.required]),
      Status: new FormControl(this.registro.Status, [Validators.required]),
      Email: new FormControl(this.registro.Email, [Validators.required]),
      EmailCopia: new FormControl(this.registro.EmailCopia),
      FoneRetorno: new FormControl(this.registro.FoneRetorno, [Validators.required]),
      NomeContato: new FormControl(this.registro.NomeContato  ),
      PassoAPasso: new FormControl(this.registro.PassoAPasso),
      DataOcorrencia: new FormControl(this.registro.DataOcorrencia),
      DataLimite: new FormControl(this.registro.DataLimite),
      HoraOcorrencia: new FormControl(this.registro.HoraOcorrencia),
      WhatsApp: new FormControl(this.registro.WhatsApp),
      HangOut: new FormControl(this.registro.HangOut),
      Skype: new FormControl(this.registro.Skype),
      PaginaId: new FormControl(this.registro.PaginaId),
      PrioridadeId: new FormControl(this.registro.PrioridadeId),
      QtdHoras: new FormControl(this.registro.QtdHoras),
      ValorEstimado: new FormControl(this.registro.ValorEstimado),
      PerfilDestinatariosId: new FormControl(this.registro.PerfilDestinatariosId),
      SistemaId: new FormControl(this.registro.SistemaId),
      SolicitanteId: new FormControl(this.registro.SolicitanteId),
      UsuarioDestinatarioId: new FormControl(this.registro.UsuarioDestinatarioId),
      TipoSolicitacaoId: new FormControl(this.registro.TipoSolicitacaoId)
    });
  }

  selectedPhoneNumber(event: any) {
    console.log('selectedPhoneNumber', event);
    this.listar(event);
  }

  ngOnInit(): void {
    this.inicializacao();
    
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

  private prepareToSave(formModel: Ticket): void {
    this.registro = { ...this.registro, ...formModel };
  }

  salvar(formModel: Ticket) {
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

import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { loggar, _CodeBase64 } from '../../services/constantes';
import { ExternalService } from '../../services/external.service';

@Component({
  selector: 'app-busca-cliente-dialog',
  templateUrl: './busca-cliente-dialog.component.html',
  styleUrls: ['./busca-cliente-dialog.component.scss']
})
export class BuscaClienteDialogComponent implements OnInit {

  public local = {
    licenciada: null,
    CNPJ: '',
    UrlRoot: '',
    EndPoint: '',
    numeroChamador: '',
    clienteList: [],
    textoBusca: '',
    userName: '',
    buscarPor: ''
  }
  registro: any;


  constructor(
    public services: ExternalService,
    public dialogRef: MatDialogRef<BuscaClienteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.local.licenciada = data.licenciada;
    this.local.CNPJ = data.licenciada.CNPJ;
    this.local.UrlRoot = data.licenciada.UrlRoot;
    this.local.EndPoint = data.licenciada.EndPoint;
    this.local.numeroChamador = data.numeroChamador;
    this.local.userName = data.userName;
    this.local.buscarPor = data.buscarPor;
    if (loggar) console.log('constructor', data, this.local);
  }

  ngOnInit(): void {

  }

  getPosts(item: string): void {
    const valores = item.split("|");
    this.registro = this.local.clienteList.find((x) => x.Nome === valores[0]);
    console.log('getPosts', this.registro);
  }

  buscaPaciente(texto: string): void {
    console.log('buscaPaciente', texto);
    if (texto.length > 3) {
      if (this.local.buscarPor === 'licenciada') {
        this.services
          .httpGet("endpointbyphone/" + texto)
          .subscribe(retorno => {
            this.local.clienteList = retorno.lista;
          });
      } else
        this.services
          .httpGet("pessoacliente/" + _CodeBase64(texto + ";Paciente", this.services.userCPF, this.local.CNPJ), this.local.CNPJ)
          .subscribe(retorno => {
            this.local.clienteList = retorno.lista;
          });
    }
  }

  enviar() {
    this.dialogRef.close(this.registro);
  }

}

import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EndPoint } from 'src/app/shared/classes/endpoint';
import { _log } from 'src/app/shared/services/constantes';
import { ExternalService } from 'src/app/shared/services/external.service';

@Component({
  templateUrl: './endpoints.component.html',
  styleUrls: ['./endpoints.component.scss']
})
export class EndpointsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  licenciadas: any[];
  formGroup: FormGroup;
  registro: EndPoint;
  endpoints: any[];
  dataSource: any;

  displayedColumns: string[] = [
    "id", "licenciada", "NumeroFone", "Servico", "UrlRoot", "EndPoint", "CNPJ", "acao",
  ];


  constructor(private services: ExternalService, private _formBuild: FormBuilder) {
    this.registro = new EndPoint(0);
    this.createFormGroup();
  }

  selectLicenciada() {
    const lic = this.licenciadas.find(x => x.id === this.formGroup.controls['LicenciadaId'].value);
    _log('lic', lic);
    this.formGroup.controls['CNPJ'].setValue(lic.CNPJ);
  }

  createFormGroup() {
    this.formGroup = this._formBuild.group({
      Ativo: new FormControl(this.registro.Ativo, [Validators.required]),
      LicenciadaId: new FormControl(this.registro.LicenciadaId, [Validators.required]),
      CNPJ: new FormControl(this.registro.CNPJ, [Validators.required]),
      Servico: new FormControl(this.registro.Servico, [Validators.required]),
      UrlRoot: new FormControl(this.registro.UrlRoot, [Validators.required]),
      EndPoint: new FormControl(this.registro.EndPoint, [Validators.required]),
      NumeroFone: new FormControl(this.registro.NumeroFone, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.services.httpGet('licenciadas')
      .subscribe(r => {
        this.licenciadas = r.lista;
        _log('licenciadas', this.licenciadas, r);
      }, erro => console.log(erro));

    this.listar();
  }

  novo() {

  }

  applyFilter(event: any) {

  }
  listar() {
    this.services.httpGet('endpoints')
      .subscribe(r => {
        this.endpoints = r.lista;
        _log('endpoints', this.endpoints);
        this.dataSource = new MatTableDataSource(this.endpoints);
        this.dataSource.paginator = this.paginator;
      }, erro => console.log(erro));
  }

  editar(element: any) {
    this.registro = element;
    _log('editar', this.registro);
    this.createFormGroup();
  }

  apagar(element: any) {

  }

  salvar(formModel: EndPoint) {
    const erros = this.services.findInvalidControls(this.formGroup);

    if (erros.length === 0) {
      this.prepareToSave(formModel);
      const capsula = { metodo: 'novo endpoint', registro: this.registro };
      capsula.registro = this.registro;

      if (this.registro.Id === 0)
        this.services.httpPost("endpoint", capsula)
          .subscribe(r => {
            this.listar();
            this.registro = new EndPoint(0);
            this.createFormGroup();
          });
      else
        this.services.httpPut("endpoint/" + this.registro.Id, capsula)
          .subscribe(r => {
            this.listar();
            this.registro = new EndPoint(0);
            this.createFormGroup();
          });
    } else {
      _log("falhou findInvalidControls");

      return;
    }
  }

  private prepareToSave(formModel: EndPoint): void {
    this.registro = { ...this.registro, ...formModel };
  }

}

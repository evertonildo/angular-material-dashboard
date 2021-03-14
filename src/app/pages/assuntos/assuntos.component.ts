import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracao',
  templateUrl: './assuntos.component.html',
  styleUrls: ['./assuntos.component.scss']
})
export class AssuntosComponent implements OnInit {

  cadastro: boolean;

  displayedColumns = [
    "Id",
    "Codigo",
    "Nome",
    "Descricao",
    "acao",
  ];
  dataSource;
  constructor() {
    this.cadastro = false;
  }

  ngOnInit(): void {
  }

}

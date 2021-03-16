import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { _log } from '../../services/constantes';

@Component({
  templateUrl: './dlg-mensagem.component.html',
  styleUrls: ['./dlg-mensagem.component.scss']
})
export class DlgMensagemComponent implements OnInit {
  mensagem: any;

  constructor(
    public dialogRef: MatDialogRef<DlgMensagemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    _log('data', data);
    this.mensagem = data.mensagem;
  }

  ngOnInit(): void {
  }

}

import { _log } from './shared/services/constantes';
import { AccessComponent } from './shared/components/dialog/access.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ExternalService } from './shared/services/external.service';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Solus Call Center';
  numeroChamador: string;
  numeroChamado: string;
  ramalId: string;
  operador: string;
  user: any;
  userId: any;
  userName: any;
  userNick: any;
  avatar: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private service: ExternalService
  ) {
    this.numeroChamador = this.GetParam('CallerDisplayName');
    this.numeroChamado = this.GetParam('CallerNumber');
    this.ramalId = this.numeroChamador.split(':')[0];
    this.operador = this.numeroChamador.split(':')[1];
  }

  ngOnInit() {
    const CallerDisplayName = this.GetParam('CallerDisplayName').split(':');
    this.numeroChamador = CallerDisplayName[0];
    this.numeroChamado = this.GetParam('CallerNumber');
    this.ramalId = CallerDisplayName[1];
    this.operador = CallerDisplayName[2];


    if (!this.service.userLogged) {
      const dialogRef = this.dialog.open(AccessComponent, {
        data: {},
        width: '50%',
        height: '50%',
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((result) => {
        _log('retorno', result);
        if (result.registro.logado) {
          this.service.userId = result.id;
          this.service.userName = result.registro.nome;
          this.service.userNick = result.registro.comoEhConhecido;
          this.service.userAvatar = result.registro.usuario.imgAvatar;
          this.service.Perfil = result.registro.usuario.perfil;
          this.service.userCPF = result.registro.cpf;
          this.service.userLicenciadaCNPJ = environment.cnpjCentral;
          this.identificaUsuario();
          let chave = this.numeroChamado + '.' + this.numeroChamador;
          this.router.navigate(['chamadas', chave]);
        } else {
          _log('Usuário não logado', result);
        }
      });
    } else {
      this.user = this.service.userData;
      let chave = this.numeroChamado + '.' + this.numeroChamador;
      this.router.navigate(['chamadas', chave]);

    }
  }

  identificaUsuario() {
    this.userId = this.service.userId;
    this.userName = this.service.userName;
    this.userNick = this.service.userNick;
    this.avatar = this.service.userAvatar;
  }

  GetParam(name): string {
    console.log('url', window.location.href);
    const results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(
      window.location.href
    );
    if (!results) {
      return '';
    }
    return results[1] || '';
  }
}

export interface UserData {
  id: number;
  nome: string;
  matricula: string;
  ramal: string;
}

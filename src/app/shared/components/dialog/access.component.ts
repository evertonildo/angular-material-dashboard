import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { _log, CriptografarMD5 } from '../../services/constantes';
import { ExternalService } from '../../services/external.service';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss'],
})
export class AccessComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private service: ExternalService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void { }

  onNoClick(): void { }
  onClick(form: any): void {
    console.log('onClick', form);
    const login = {
      Login: form.user,
      Senha: CriptografarMD5(form.password),
      CNPJ: '',
    };
    this.service.userToken = CriptografarMD5(form.password);
    console.log('login', login);
    this.service.login(login).subscribe((result) => {
      console.log('retorno login', result);
      this.service.userId = result.id;
      this.service.userName = result.registro.nome;
      this.service.userNick = result.registro.comoEhConhecido;
      this.service.userAvatar = result.registro.usuario.imgAvatar;
      this.service.Perfil = result.registro.usuario.perfil;
      this.service.userCPF = result.registro.cpf;
      this.service.userLicenciadaCNPJ = environment.cnpjCentral;

      this.dialogRef.close(result);
    });
  }
}

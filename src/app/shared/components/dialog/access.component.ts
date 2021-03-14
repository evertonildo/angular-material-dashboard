import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    _log('onClick', form);
    const login = {
      Login: form.user,
      Senha: CriptografarMD5(form.password),
      CNPJ: '',
    };

    _log('login', login);
    this.service.login(login).subscribe((result) => {
      _log('login', result);
      this.dialogRef.close(result);
    });
  }
}

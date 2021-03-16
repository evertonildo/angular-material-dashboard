import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { _isNullOrEmpty, _log } from './constantes';

@Injectable({
  providedIn: 'root',
})
export class ExternalService {
  clearUserData() {
    this.localStorage.clear();
  }
  public buscaCustomerService(id: number) {
    return this.httpGet('customer-service/' + id);
  }
  headers: HttpHeaders;
  constructor(public httpClient: HttpClient, public snackBar: MatSnackBar, @Inject('LOCALSTORAGE') private localStorage: any) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json');
  }

  public get userData(): any { return this.getLocalStorage('_userCPF'); }
  public set userData(value: any) {
    if (value === null) this.removeStorage('_userCPF'); else this.setLocalStorage("_userCPF", value);
  }

  public get Perfil(): string { return this.getLocalStorage('_Perfil'); }
  public set Perfil(value: string) {
    if (value === null) this.removeStorage('_Perfil'); else this.setLocalStorage("_Perfil", value);
  }

  public get token(): string { return this.getLocalStorage('_token'); }
  public set token(value: string) {
    if (value === null) this.removeStorage('_token'); else this.setLocalStorage("_token", value);
  }

  public get userCPF(): string { return this.getLocalStorage('_userCPF'); }
  public set userCPF(value: string) {
    if (value === null) this.removeStorage('_userCPF'); else this.setLocalStorage("_userCPF", value);
  }

  public get userLicenciadaCNPJ(): any { return this.getLocalStorage('_userLicenciadaCNPJ') || environment.cnpjCentral; }
  public set userLicenciadaCNPJ(value: any) {
    if (value === null) this.removeStorage('_userLicenciadaCNPJ'); else this.setLocalStorage("_userLicenciadaCNPJ", value);
  }

  public get userAvatar(): any { return this.getLocalStorage('callUserAvatar'); }
  public set userAvatar(value: any) {
    if (value === null) this.removeStorage('callUserAvatar'); else this.setLocalStorage("callUserAvatar", value);
  }

  public get userNick(): any { return this.getLocalStorage('callUserNick'); }
  public set userNick(value: any) {
    if (value === null) this.removeStorage('callUserNick'); else this.setLocalStorage("callUserNick", value);
  }

  public get userName(): any { return this.getLocalStorage('callUserName'); }
  public set userName(value: any) {
    if (value === null) this.removeStorage('callUserName'); else this.setLocalStorage("callUserName", value);
  }

  public get userId(): any { return this.getLocalStorage('callUserId'); }
  public set userId(value: any) {
    if (value === null) this.removeStorage('callUserId'); else this.setLocalStorage("callUserId", value);
  }

  public login(login: { Login: any; Senha: any; CNPJ: string; }): Observable<any> {
    _log('login', environment.url + 'login');
    const capsula = { registro: login, metodo: 'login' };
    return this.httpClient.post(environment.url + 'login', JSON.stringify(capsula), { headers: this.headers });
  }
  public get userLogged(): boolean {
    return this.userId > 0;
  }
  public httpGet(metodo: string): Observable<any> {
    return this.httpClient.get(environment.url + metodo, { headers: this.getHeaders(), });
  }

  public httpPost(metodo: string, body: any, newHeaders: HttpHeaders = null): Observable<any> {
    if (_isNullOrEmpty(body.UsuarioCPF)) {
      body.UsuarioCPF = this.userCPF;
    }
    if (_isNullOrEmpty(body.LicenciadaCNPJ)) {
      body.LicenciadaCNPJ = this.userLicenciadaCNPJ;
    }

    if (newHeaders === null)
      newHeaders = this.getHeaders();

    return this.httpClient.post(environment.url + metodo, JSON.stringify(body), { headers: newHeaders });
  }

  public httpPut(metodo: string, body: any): Observable<any> {
    console.log('httpPut', environment.url + metodo, body);
    if (_isNullOrEmpty(body.UsuarioCPF)) {
      body.UsuarioCPF = this.userCPF;
    }
    if (_isNullOrEmpty(body.LicenciadaCNPJ)) {
      body.LicenciadaCNPJ = this.userLicenciadaCNPJ;
    }

    return this.httpClient.put(environment.url + metodo, JSON.stringify(body), { headers: this.getHeaders(), });
  }

  public httpDelete(metodo: string): Observable<any> {
    return this.httpClient.delete(environment.url + metodo, { headers: this.getHeaders(), });
  }

  private getLocalStorage(chave: string): any {
    return localStorage.getItem(chave);
  }
  private setLocalStorage(chave: string, value: any): void {
    localStorage.setItem(chave, value);
  }

  public setStorageObject(chave: string, valor: any): any {
    this.localStorage.setItem(chave, JSON.stringify(valor));
  }

  public getStorageObject(chave: string): any {
    return this.localStorage.getItem(chave);
  }
  private removeStorage(chave: string): any {
    this.localStorage.removeItem(chave);
  }

  getHeaders(chave: string = "", valor: string = ""): HttpHeaders {

    if (!this.headers)
      this.headers = new HttpHeaders();

    if (!this.headers.has("Content-Type"))
      this.headers = this.headers.set("Content-Type", "application/json");

    if (!this.headers.has("Environment")) {
      if (environment.production)
        this.headers = this.headers.set("Environment", "P");
      else if (environment.hmr)
        this.headers = this.headers.set("Environment", "H");
      else this.headers = this.headers.set("Environment", "D");
    }

    if (!this.headers.get("cnpj") === null) {
      this.headers = this.headers.append("cnpj", this.userLicenciadaCNPJ);
      //_log('cnpj incluido no header', this.userLicenciadaCNPJ, this.headers);
    } else if (this.userLicenciadaCNPJ !== this.headers.get('cnpj')) {
      this.headers = this.headers.set("cnpj", this.userLicenciadaCNPJ);
      //_log('cnpj alterado no header', this.userLicenciadaCNPJ, this.headers);
    }
    //_log('headers', this.headers);

    if (!this.headers.get("cpf") === null) {
      this.headers = this.headers.append("cpf", this.userCPF);
      //_log('cpf incluido no header', this.userCPF, this.headers);
    } else if (this.userCPF !== this.headers.get("cpf")) {
      this.headers = this.headers.set("cpf", this.userCPF);
      //_log('cpf alterado no header', this.userCPF, this.headers);
    }


    if (this.userId > 0 && !this.headers.has("userId"))
      this.headers = this.headers.set("userId", this.userId.toString());

    if (chave !== "") {

      if (!this.headers.has(chave)) {
        this.headers = this.headers.set(chave, valor);
        //_log('add header ', chave, valor);
      }
      else if (this.headers.get(chave) !== valor) {
        this.headers = this.headers.set(chave, valor);
        //_log('update header ', chave, valor);
      }
    };

    // _console("getHeaders", this.headers);
    return this.headers;
  }

  public findInvalidControls(formGroup: FormGroup): any[] {
    const invalid = [];
    const controls = formGroup.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    if (invalid.length > 0) {
      let campos = "";
      invalid.forEach((element) => {
        campos += (campos === "" ? "" : "; ") + element;
      });
      this.snackBar.open(
        "Os sequintes campos são obrigatórios: " + campos,
        "Atenção",
        { duration: 5000 }
      );
    }
    return invalid;
  }

  /**
   * 
   * @param CNPJ Número do cnpj da licenciada que será usado para direcionar para a base da licenciada
   * @param EndPoint Endpoint que será usado para buscar o cliente que ligou
   * @param numeroChamador Número do cliente que ligou
   * @returns 
   */
  public buscaClienteChamadorNaLicenciada(body: { CNPJ: string, UrlRoot: string, EndPoint: string, numeroChamador: string }): Observable<any> {
    console.log('buscaClienteChamadorNaLicenciada', body.CNPJ, body.UrlRoot, body.numeroChamador, body.EndPoint + body.numeroChamador);
    return this.httpClient.get(body.UrlRoot + body.EndPoint + body.numeroChamador, { headers: this.getHeaders("cnpj", body.CNPJ) });
  }

  /**
   * Esse observable busca o endpoint a ser usado para buscar o cliente que fez a ligação
   * @param numeroChamado número que o cliente chamou na central
   * @returns O registro de endpoint cadastrado
   */
  public endpointByPhone(numeroChamado: string): Observable<any> {
    console.log('buscaEndpoint', numeroChamado, 'endpointbyphone/' + numeroChamado);
    return this.httpGet('endpointbyphone/' + numeroChamado);
  }

  public postCadastraClienteNaCentral(cliente: any): Observable<any> {
    console.log('postCadastraClienteNaCentral url', cliente, environment.url + 'pessoa');
    cliente.Id = 0;
    return this.httpClient.post<any>(environment.url + 'pessoa',
      { registro: cliente },
      { headers: this.getHeaders('cnpj', environment.cnpjCentral) });
  }


  /**
   * Verifica se cliente já está cadastrado na central
   * @param CNPJ Documento do cliente ligador que foi buscado na base da licenciada
   * @returns Retorna o registro se ele existir
   */
  public verificaSeClienteCadastradoNaCentral(body: { CNPJ: string, UrlRoot: string, EndPoint: string, numeroChamador: string }): Observable<any> {
    console.log('verificaSeClienteCadastradoNaCentral', body.UrlRoot + body.EndPoint + body.numeroChamador);
    return this.httpClient.get<any>(body.UrlRoot + body.EndPoint + body.numeroChamador,
      { headers: this.getHeaders('cnpj', body.CNPJ) });
  }



}

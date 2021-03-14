import { Md5 } from 'ts-md5';
import { Injectable } from '@angular/core';
import { JwtHelper } from './jwt-helper';
import { AuthenticatedUser } from './authenticated-user';
// import { LocalStorageService } from './local-storage.service';
import * as _ from 'lodash';
import { ExternalService } from '../services/external.service';

@Injectable()
export class CredenciaisService {

    private authenticatedUser: AuthenticatedUser;
    public UserId: number;

    constructor(public services: ExternalService) { }

    getToken(): string { return this.services.token; }

    setToken(token: string): void {
        this.services.token =  token;
        this.services.token = token;
    }

    public estaLogado(): boolean {

        if (!this.getToken()) { return false; }
        try {

            const jwtHelper = new JwtHelper();
            const decodedToken = jwtHelper.decodeToken(this.getToken());

            if (decodedToken !== null && typeof decodedToken === 'object' && !this.tokenExpirado()) {
                this.authenticatedUser = decodedToken;
                // this.localStorageService.setMD5('userId', decodedToken.idUsuario);
                return true;
            }

            return false;
        } catch (e) {
            return false;
        }
    }

    public get usuarioAutenticado(): AuthenticatedUser {

        if (this.authenticatedUser) {
            return this.authenticatedUser;
        }

        this.estaLogado();
        return this.authenticatedUser;
    }

    public tokenExpirado(): boolean {

        if (this.getToken()) {
            const jwtHelper = new JwtHelper();
            // // _console('tokenExpirado() Não');
            return false; // jwtHelper.isTokenExpired(this.getToken());
        }
        // // _console('tokenExpirado() Sim');
        return false;
    }

    public tempoExpiracao(): Date {
        const token = this.getToken();
        const jwtHelper = new JwtHelper();
        return jwtHelper.getTokenExpirationDate(token);
    }

    public logout(): void { this.services.token = ''; }

    refreshToken(token): void { this.setToken(token); }

    possuiRole(role: string): boolean { return _.includes(this.authenticatedUser.rules, role); }

    possuiObjeto(role: string): any { return _.includes(this.authenticatedUser.objetos, role); }

    possuiUmaDasRules(rules: Array<string>): boolean { return rules.some((r, i, arr) => this.possuiRole(r)); }

}

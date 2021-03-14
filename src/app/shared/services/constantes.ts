import { Md5 } from "ts-md5";

export const loggar = window.location.hostname.indexOf("localhost") >= 0;

export const appVersion = "2021.01.282158";

export function CriptografarMD5(value: string): string {
    return Md5.hashStr(value).toString();
}


export function _log(...args: any[]) {
    if (loggar || args[0] === '44086423391') { console.log(...args); }
}

export function _MenuControl(nav: any[], perfis: any[]): any[] {
    const perfil = perfis[0];
    var items = nav.filter((item) => item.rules.indexOf(perfil) !== -1);
    // _console("_MenuControl", nav, items, perfis);
    return items;
}

export function _IfNull(v1: any, v2: any): any {
    if (v1 === undefined || v1 === null) return v2;
    else return v1;
}

export function _CodeBase64(arg0: string, cpf: string, cnpj: string): string {
    if (cpf === null || cpf === undefined || cpf === "") {
        // _console("_CodeBase64 cpf inválido");
    }
    if (cnpj === null || cnpj === undefined || cnpj === "") {
        // _console("_CodeBase64 cnpj inválido");
    }
    return btoa(arg0 + "|" + cpf + "|" + cnpj + "|" + new Date().getHours());
}

export function _fromBase64(chave: string): string {
    return atob(chave);
}

export function _toBase64(...args: any[]): string {
    let retorno = "";
    args.forEach((e) => {
        retorno = (retorno === "" ? "" : ";") + e;
    });
    return btoa(retorno);
}

export interface MensagemConsole {
    tipo: string;
    local: string;
    mensagem: any;
}

export function strToBool(str: string): boolean {
    if (str === null || str === undefined) str = "";
    return str.toUpperCase().indexOf("S") === 0;
}

export function _isNullOrEmpty(value: any): boolean {
    return value === undefined || value === "" || value === null;
}

// opcoes :string = "cp" | "cr" | "cd" | "d";

export function setFluxo(
    p?: "cp" | "cr" | "cd" | "d"
): "P" | "R" | "I" | "C" | "D" {
    if (p === "cp") {
        return "P";
    } else if (p === "cr") {
        return "R";
    } else if (p === "cd") {
        return "C";
    } else {
        return "R";
    }
}

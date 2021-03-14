
// Avoid TS error "cannot find name escape"
declare var escape: any;

/**
 * Helper class to decode and find JWT expiration.
 */
export class JwtHelper {

  public urlBase64Decode(str: string): string {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: { break; }
      case 2: { output += '=='; break; }
      case 3: { output += '='; break; }
      default: {
        throw new Error('Illegal base64url string!');
      }
    }
    // polyfill https://github.com/davidchambers/Base64.js

    // // _console("urlBase64Decode", str, output);

    return decodeURIComponent(escape(typeof window === 'undefined' ? atob(output) : window.atob(output)));
  }

  public decodeToken(token: string): any {

    const parts = token.split('.');
    if (parts.length !== 3) {
      // _console('decodeToken token', token);
      // throw new Error('JWT must have 3 parts');
      return "token inválido"
    }

    const decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token');
    }
    return JSON.parse(decoded);
    // return JSON.parse(token);
  }

  public getTokenExpirationDate(token: string): Date {
    let decoded: any;
    decoded = this.decodeToken(token);

    if (typeof decoded.exp === 'undefined') {
      return new Date(0);
    }

    const date = new Date(0); // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  public isTokenExpired(token: string, offsetSeconds?: number): boolean {
    const date = this.getTokenExpirationDate(token);
    offsetSeconds = offsetSeconds || 0;

    // Token expired?
    return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
  }
}

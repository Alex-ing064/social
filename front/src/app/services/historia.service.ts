import { JwtHelperService } from "@auth0/angular-jwt";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from './GLOBAL';


@Injectable({
  providedIn: 'root'
})
export class HistoriaService {
  public url = GLOBAL.url;


  constructor(
    private _http: HttpClient
  ) {
  }

  createStory(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': token });
    const fd = new FormData();
    fd.append('imagen', data.imagen);
    fd.append('usuario', data.usuario);

    return this._http.post(this.url + 'createStory', fd, { headers: headers });
  }
}

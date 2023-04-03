import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public url = GLOBAL.url;

  constructor(
    private _http : HttpClient
  ) { }

  create_usuario(data:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'create_usuario',data,{headers:headers})
  }
  login_usuario(data:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'login_usuario',data,{headers:headers})
  }
  
}

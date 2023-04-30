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

  //
  get_usuario(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'get_usuario/'+id,{headers:headers})
  }

  update_usuario(id:any,data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'update_usuario/'+id,data,{headers:headers})
  }
  update_password(id:any,data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'update_password/'+id,data,{headers:headers})
  }
  validate_usuario(data:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'validate_usuario',data,{headers:headers})
  }
  validate_code(code:any,email:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'validate_code/'+code+'/'+email,{headers:headers})
  }
  reset_password(email:any,data:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'reset_password/'+ email,data,{headers:headers})
  }
}

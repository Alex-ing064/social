import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from './GLOBAL';
import { JwtHelperService } from "@auth0/angular-jwt";

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
    return this._http.post(this.url+'reset_password/'+email,data,{headers:headers})
  }
  get_usuario_random(token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'get_usuario_random',{headers:headers})
  }
  send_invitacion_amistad(data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'send_invitacion_amistad',data,{headers:headers})
  }

  get_invitaciones_usuario (tipo:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'get_invitaciones_usuario/'+ tipo,{headers:headers})
  }
  aceptar_denegar_invitacion(tipo: any, id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'aceptar_denegar_invitacion/' + tipo + '/' + id, { headers: headers })
  }


  isAuthenticate(){
    const token :any = localStorage.getItem('token');

    try {

      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token);

      if(!token){
        localStorage.clear();
        return false;
      }

      if(helper.isTokenExpired(token)){
        localStorage.clear();
        return false;
      }

      
    } catch (error) {
      console.log(error);
      localStorage.clear();
      return false;
    }

    return true;

  }

  
}

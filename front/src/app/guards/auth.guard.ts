import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _router:Router,
    private _usuarioService:UsuarioService
  ){
    
  }
  
  canActivate():any{
    let access = this._usuarioService.isAuthenticate();

    if(!access) this._router.navigate(['/login']);

    return true;
  }
  
}

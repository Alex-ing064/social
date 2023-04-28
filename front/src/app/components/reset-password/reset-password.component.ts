import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public step = 1;

  public email = '';
  public msm_error = '';

  constructor(
    private _usuarioService:UsuarioService
  ) { }

  ngOnInit(): void {
  }

  step_uno(){
    if(!this.email){
      this.msm_error = 'El correo electrónico es requerido';
    }else{
      this._usuarioService.validate_usuario({
        email: this.email
      }).subscribe(
        response=>{
          console.log(response);
          
        }
      );
    }
  }

}

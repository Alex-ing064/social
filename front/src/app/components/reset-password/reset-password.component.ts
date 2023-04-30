import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
declare var passwordStrengthMeter:any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public step = 1;

  public email = '';
  public code = '';
  public msm_error = '';

  public password_new = '';
  public password_conf = '';
  public nivel_password = 0;

  constructor(
    private _usuarioService:UsuarioService,
    private _router:Router
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
          this.step = 2;
        }
      );
    }
  }

  step_dos(){
    if(!this.code){
      this.msm_error = 'El código es requerido';
    }else{
      this._usuarioService.validate_code(this.code,this.email).subscribe(
        response=>{
          if(response.data){
            //
            setTimeout(() => {
              const myPassMeter = passwordStrengthMeter({
                containerElement: '#pswmeter',
                passwordInput: '#psw-input',
                showMessage: true,
                messageContainer: '#pswmeter-message',
                messagesList: [
                  'Escribe tu contraseña...',
                  'Es muy facil',
                  'Puedes mejorar la dificultad',
                  'Es una buena contraseña',
                  'Tu contraseña es genial!'
                ],
                height: 8,
                borderRadius: 4,
                pswMinLength: 8,
                colorScore1: '#dc3545',
                colorScore2: '#f7c32e',
                colorScore3: '#4f9ef8',
                colorScore4: '#0cbc87'
              });
        
              myPassMeter.containerElement.addEventListener('onScore0', ()=> {
                this.nivel_password = 0;
              });
              myPassMeter.containerElement.addEventListener('onScore1', ()=> {
                this.nivel_password = 1;
              });
              myPassMeter.containerElement.addEventListener('onScore2', ()=> {
                this.nivel_password = 2;
              });
              myPassMeter.containerElement.addEventListener('onScore3', ()=> {
                this.nivel_password = 3;
              });
              myPassMeter.containerElement.addEventListener('onScore4', ()=> {
                this.nivel_password = 4;
              });
            }, 50);
            this.step = 3;
          }else{
            this.msm_error = 'El código es incorrecto';
          }
        }
      );
    }
  }

  step_tres(){
    if(!this.password_new){
      this.msm_error = 'La nueva contraseña es requerida';
    }else if(this.nivel_password != 4){
      this.msm_error = 'Tu contraseña no es segura';
    }else if(!this.password_conf){
      this.msm_error = 'La confirmación es requerida';
    }else if(this.password_new != this.password_conf){
      this.msm_error = 'Las contraseñas no coinciden';
    }else{
        //
        this._usuarioService.reset_password(this.email,{
          password_new: this.password_new
        }).subscribe(
          response=>{
            console.log(response);
            this._router.navigate(['/login']);
          }
        );
    }
  }

}

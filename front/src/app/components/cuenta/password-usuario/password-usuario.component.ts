import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
declare var passwordStrengthMeter:any;


@Component({
  selector: 'app-password-usuario',
  templateUrl: './password-usuario.component.html',
  styleUrls: ['./password-usuario.component.css']
})
export class PasswordUsuarioComponent implements OnInit {

  public token = localStorage.getItem('token');
  public password_actual = '';
  public password_nueva = '';
  public password_conf_nueva = '';
  public nivel_password = 0;
  public user :any = {};
  public error_msm = '';

  constructor(
    private _usuarioService:UsuarioService,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
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
  }

  actualizar(){
    if(!this.password_actual){
      this.error_msm = 'La contraseña actual es requerida';
    }else if(!this.password_nueva){
      this.error_msm = 'La nueva contraseña es requerida';
    }else if(this.nivel_password != 4){
      this.error_msm = 'Tu contraseña no es segura';
    }else if(!this.password_conf_nueva){
      this.error_msm = 'La confirmación es requerida';
    }else if(this.password_nueva != this.password_conf_nueva){
      this.error_msm = 'Las contraseñas no coinciden';
    }else{
      this.error_msm = '';
      console.log(this.password_nueva);
      this._usuarioService.update_password(this.user._id,{
        password_actual: this.password_actual,
        password_nueva: this.password_nueva
      },this.token).subscribe(
        response=>{
          console.log(response);
          if(response.data != undefined){
            //
            localStorage.clear();
            window.location.reload();
          }else{
            this.error_msm = response.message;
          }
        }
      );
    }
  }
}

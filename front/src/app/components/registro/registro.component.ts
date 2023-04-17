import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
declare var passwordStrengthMeter: any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public nivel_constraseña = 0;
  public usuario: any = {};
  public msm_error = '';

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
  ) { }

  ngOnInit(): void {
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

      myPassMeter.containerElement.addEventListener('onScore0', () => {
        this.nivel_constraseña = 0;
      });
      myPassMeter.containerElement.addEventListener('onScore1', () => {
        this.nivel_constraseña = 1;
      });
      myPassMeter.containerElement.addEventListener('onScore2', () => {
        this.nivel_constraseña = 2;
      });
      myPassMeter.containerElement.addEventListener('onScore3', () => {
        this.nivel_constraseña = 3;
      });
      myPassMeter.containerElement.addEventListener('onScore4', () => {
        this.nivel_constraseña = 4;
      });
    }, 50);
  }

  registro() {
    if (!this.usuario.nombres) {
      this.msm_error = 'Los nombres son requeridos';
    } else if (!this.usuario.apellidos) {
      this.msm_error = 'Los apellidos son requeridos';
    } else if (!this.usuario.email) {
      this.msm_error = 'El email es requerido';
    } else if (!this.usuario.password) {
      this.msm_error = 'La contraseña es requerida';
    } else if (!this.usuario.password_confirm) {
      this.msm_error = 'La contraseña de confirmación es requerida';
    } else if (this.usuario.password.length <= 5) {
      this.msm_error = 'La contraseña debe tener mas de 6 caractares';
    } else if (this.usuario.password != this.usuario.password_confirm) {
      this.msm_error = 'Las contraseñas no coinciden';
    } else if (this.nivel_constraseña != 4) {
      this.msm_error = 'La contraseña es debe ser mas fuerte';
    } else {

      console.log(this.usuario);
      this._usuarioService.create_usuario(this.usuario).subscribe(
        response => {
          if (response.data != undefined) {
            this.msm_error = '';
            this._router.navigate(['/login']);
          } else {
            this.msm_error = response.message;
          }

        }
      );
    }
  }

}

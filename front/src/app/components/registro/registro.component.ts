import { Component, OnInit } from '@angular/core';
declare var passwordStrengthMeter:any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public nivel_constraseña = 0;

  constructor() { }

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

      myPassMeter.containerElement.addEventListener('onScore0', ()=> {
        this.nivel_constraseña = 0;
      });
      myPassMeter.containerElement.addEventListener('onScore1', ()=> {
        this.nivel_constraseña = 1;
      });
      myPassMeter.containerElement.addEventListener('onScore2', ()=> {
        this.nivel_constraseña = 2;
      });
      myPassMeter.containerElement.addEventListener('onScore3', ()=> {
        this.nivel_constraseña = 3;
      });
      myPassMeter.containerElement.addEventListener('onScore4', ()=> {
        this.nivel_constraseña = 4;
      });
    }, 50);
  }

}

import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { io } from "socket.io-client";

@Component({
  selector: 'app-invitaciones-usuario',
  templateUrl: './invitaciones-usuario.component.html',
  styleUrls: ['./invitaciones-usuario.component.css']
})
export class InvitacionesUsuarioComponent implements OnInit {

  public token = localStorage.getItem('token');
  public load_invitacion = true;
  public invitaciones : Array<any> = [];
  public socket = io("http://localhost:4201",{transports: ['websocket']});

  constructor(
    private _usuarioService:UsuarioService
  ) { }

  ngOnInit(): void {
    this.socket.on('new-invitacion',function(data:any){
      console.log(data);
      if(data._id == this.user._id){
        this.init_invitaciones();
      }
    }.bind(this));
    this.init_invitaciones();
  }

  init_invitaciones(){
    this.load_invitacion = true;
    this._usuarioService.get_invitaciones_usuario('Limite',this.token).subscribe(
      response=>{
        this.invitaciones = response.data;
        console.log(this.invitaciones);
        
        this.load_invitacion = false;
      }
    );
  }

  set_invitacion(tipo:any,id:any,item:any){
    this._usuarioService.aceptar_denegar_invitacion(tipo,id,this.token).subscribe(
      response=>{
        console.log(response);
        this.socket.emit('set-invitacion', {
          origen:item.usuario_origen._id,
          destinatario: item.usuario_destinatario
        });
        this.init_invitaciones();
      }
    );
  }

}

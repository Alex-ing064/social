import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { io } from "socket.io-client";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public token = localStorage.getItem('token');
  public invitaciones : Array<any> = [];
  public socket = io("http://localhost:4201",{transports: ['websocket']});
  public user: any = {};

  constructor(
    private _usuarioService:UsuarioService
  ) { 
    this.user = JSON.parse(localStorage.getItem('user')!);
    console.log(this.user);
    
  }

  ngOnInit(): void {
    this.init_invitaciones();
    this.socket.on('new-invitacion',function(data:any){
      console.log(data);
      if(data._id == this.user._id){
        this.init_invitaciones();
      }
    }.bind(this));
  }

  logout(){
    localStorage.clear();
    window.location.reload();
  }

  emit_event(){
    this.socket.emit('test-event',{data: 'Hola'});
  }

  init_invitaciones(){
    this._usuarioService.get_invitaciones_usuario(this.token).subscribe(
      response=>{
        this.invitaciones = response.data;
      }
    );
  }
}

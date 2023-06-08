import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { io } from "socket.io-client";
import { Router } from '@angular/router';

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
  public load_invitacion = false;
  public search = '';

  constructor(
    private _usuarioService:UsuarioService,
    private _router:Router
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
    this.load_invitacion = true;
    this._usuarioService.get_invitaciones_usuario('Limite',this.token).subscribe(
      response=>{
        this.invitaciones = response.data;
        this.load_invitacion = false;
      }
    );
  }

  set_invitacion(tipo:any,id:any,item:any){
    this._usuarioService.aceptar_denegar_invitacion(tipo,id,this.token).subscribe(
      response=>{
        console.log(response);
        this.socket.emit('set-invitacion',{
          origen: item.usuario_origen._id,
          destinario: item.usuario_destinatario
        });
        this.init_invitaciones();

      }
    );
  }

  search_usuario(){
    this._router.navigate(['/search'],{queryParams: { search: this.search }});
  }
}

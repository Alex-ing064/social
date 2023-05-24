import { Component, OnInit } from '@angular/core';
import { HistoriaService } from 'src/app/services/historia.service';
import { UsuarioService } from 'src/app/services/usuario.service';
declare var e:any;
import { io } from "socket.io-client";
declare var $:any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public token = localStorage.getItem('token');
  public user : any = {};
  public msm_story_error = '';
  public str_image : any = '';
  public image : any = undefined;
  public socket = io("http://localhost:4201",{transports: ['websocket']});
  public usuarios : Array<any> = [];

  constructor(
    private _historiaService:HistoriaService,
    private _usuarioService:UsuarioService
  ) { 

  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    
    this.socket.on('set-new-invitacion',function(data:any){
      console.log(data);
      if(data.origen.toString() == this.user._id || data.destinario.toString() == this.user._id){
        this.init_usuario();
      }
    }.bind(this));
    
    e.tinySlider();
    this.init_usuario();
    this.init_historias();
  }

  init_historias(){
    this._usuarioService.obtener_historias_usuario(this.token).subscribe(
      response=>{
        console.log(response);
        
      }
    );
  }

  uploadImage(event:any){
    var file;
    if(event.target.files && event.target.files[0]){
      file = event.target.files[0];
    }

    console.log(file);
    
    if(file.size <= 200000){
      //
      if(file.type == 'image/webp'||file.type == 'image/png'||file.type == 'image/jpg'||file.type == 'image/jpeg'||file.type == 'image/gif'){
        const reader = new FileReader();
        reader.onload = e => this.str_image = reader.result;
        reader.readAsDataURL(file);
        
        this.image = file;
      }else{
        this.msm_story_error = 'El formato es incorrecto.';
        this.image = undefined;
      }
    }else{
      this.msm_story_error = 'Se superó el tamaño máximo.';
      this.image = undefined;
    }
  }

  removeImage(){
    this.str_image = '';
    this.image = undefined;
  }

  save(){
    let data = {
      usuario: this.user._id,
      imagen: this.image
    };
    this._historiaService.createStory(data,this.token).subscribe(
      response=>{
        console.log(response);
        $('#openStory').modal('hide')
      }
    );
    console.log(data);
    
  }

  init_usuario(){
    this._usuarioService.get_usuario_random(this.token).subscribe(
      response=>{
        this.usuarios = response.data;
      }
    );
  }

  send_invitacion(id:any){
    this._usuarioService.send_invitacion_amistad({
      usuario_destinatario: id
    },this.token).subscribe(
      response=>{
        console.log(response);
        this.socket.emit('send-invitacion',{_id:id});
      }
    );
  }

}

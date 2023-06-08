import { Component, OnInit } from '@angular/core';
import { HistoriaService } from 'src/app/services/historia.service';
import { UsuarioService } from 'src/app/services/usuario.service';
declare var e: any;
import { io } from "socket.io-client";
import { GLOBAL } from 'src/app/services/GLOBAL';
declare var $: any;
declare var tns: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public token = localStorage.getItem('token');
  public user: any = {};
  public socket = io("http://localhost:4201", { transports: ['websocket'] });
  public url = GLOBAL.url;

  constructor(
    private _historiaService: HistoriaService,
    private _usuarioService: UsuarioService
  ) {

  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }
}

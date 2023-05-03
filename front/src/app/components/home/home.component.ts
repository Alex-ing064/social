import { Component, OnInit } from '@angular/core';
import { HistoriaService } from 'src/app/services/historia.service';
declare var e:any;


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

  constructor(
    private _historiaService:HistoriaService
  ) { 

  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    console.log(this.user);
    
    e.tinySlider();
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
        this.save();
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
        
      }
    );
    console.log(data);
    
  }
}

import { Component, OnInit } from '@angular/core';
declare var e: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user: any = {};
  public msm_story_error = '';

  constructor() {

  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    console.log(this.user);

    e.tinySlider();
  }

  uploadImage(event: any) {
    var file;
    if (event.target.files && event.target.files[0]) {
      file = event.target.files[0];
    }

    console.log(file);

    if (file.size <= 200000) {
      //
      if (file.type == 'image/webp' || file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'image/gif') {

      } else {
        this.msm_story_error = 'El formato es incorrecto.';
      }
    } else {
      this.msm_story_error = 'Se superó el tamaño máximo.';
    }
  }
}

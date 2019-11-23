import { Component } from '@angular/core';
import { DatosService } from "../services/datos.service";
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JobsInterface } from '../interfaces/jobs';
import { UserInterface } from '../interfaces/users';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public isError = false;
  public mensaje = "";
  constructor(private datos: DatosService, private auth: AuthService, private router: Router) {
    //this.getJobs();
    //console.log(this.headers.get("authorization"));

  }

  private jobs: JobsInterface = {
    title: 'holaaaaaa'
  }

  private user: UserInterface = {
    email: "",
    password: ""
  };

  dats = {};

  getLogin(form: NgForm) {

    // console.log(this.dats['email']);
    this.auth.postLogin(this.user.email, this.user.password).subscribe(datos => {
      let cant = (JSON.stringify(datos['token']).length);
      let cant1 = (cant - 1);

      this.auth.setUser(datos.em);
      this.auth.setToken(JSON.stringify(datos.token).substring(1, cant1));
      this.router.navigate(["/profile"]);
      this.isError = false;
      //this.registroJobs();
    }, error => {
      this.mensaje = error.error.error.message;
      this.mostrarError();


    }

    );


  }

  getJobs() {
    this.datos.getJobs().subscribe(datos => {
      console.log(datos);

    });
  }


  registroJobs() {
    this.auth.registerJobs(this.jobs).subscribe(res => {
      console.log(res);
    });
  }

  mostrarError() {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;

    }, 4000);
  }

}

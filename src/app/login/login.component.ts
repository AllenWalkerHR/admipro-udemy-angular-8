import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor(public router: Router, private usuariService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if( this.email.length > 0 ){
      this.recuerdame = true;
    }
  }

  googleInit(){
    
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '344177769414-hih812cf2bhd9a6461esqls8bhvqmj05.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      
      this.attachSignin(document.getElementById('btnGoogle'));
     
    });
  }

  attachSignin( element ){
    this.auth2.attachClickHandler( element, {}, googleUser =>{
      let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      console.log(token);
      this.auth2.disconnect();
      this.usuariService.loginGoogle(token).subscribe(() => {
        window.location.href = '#/dashboard';
        // this.router.navigate(['/dashboard']);
      });


    });
  }  

  ingresar( forma: NgForm){
    if ( forma.invalid ){
      return;
    }

    let usuario = new Usuario(
      null,
      forma.value.email,
      forma.value.password
    );

    this.usuariService.login(usuario, this.recuerdame).subscribe( resp =>{
      if( resp ){
        this.router.navigate(['/dashboard']);
      }
    });

    //this.router.navigate(['/dashboard'])
  }

}

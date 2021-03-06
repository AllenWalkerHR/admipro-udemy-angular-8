import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, public router: Router){}
  canActivate(){


    if( this.usuarioService.estaLogueado() ){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    } 
    console.log('paso por el login guard')
    return true;
  }
  
}

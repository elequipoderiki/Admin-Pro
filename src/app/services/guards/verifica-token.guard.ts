import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {
  
  constructor(public _usuarioService: UsuarioService,
    public router: Router)
  {}

  canActivate():  Promise<boolean> | boolean  {
    // console.log('verifica guard');
    let token = this._usuarioService.token;
    let payload = JSON.parse(atob(token!.split('.')[1]))
    // console.log(payload);

    let expirado = this.expirado(payload.exp);
    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.verificaRenueva(payload.exp);
    // return true;
  }
  
  verificaRenueva(fechaExp: number): Promise<boolean>{
    return new Promise((resolve, reject) => {
      let tokenExp = new Date(fechaExp * 1000); //value parameter must be in milliseconds
      let ahora = new Date(); //current date and time

      ahora.setTime(ahora.getTime() + (4*60 * 60*1000));
      if(tokenExp.getTime() > ahora.getTime()){
        resolve(true);
      } else {
        this._usuarioService.renuevaToken()
          .subscribe( () => {
            resolve(true);
          }, () => {
            this.router.navigate(['/login']);
            reject(false);
          })
      }
      resolve(true);
    })
  }

  expirado(fechaExp: number){
    let ahora = new Date().getTime()/1000;
    if(ahora > fechaExp){
      return true;
    } else {
      return false;
    }
  }
}


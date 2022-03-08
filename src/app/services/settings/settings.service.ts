 import { DOCUMENT } from '@angular/common';
import { Injectable, Inject } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor(@Inject( DOCUMENT) private _document :Document) { 
    this.cargarAjustes();
  }

  guardarAjustes(){
    // console.log('guardado en local storage');
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes(){
    if(localStorage.getItem('ajustes')){
      this.ajustes = JSON.parse( localStorage.getItem('ajustes')!);
      // console.log('cargando de localstorage');
      this.aplicarTema(this.ajustes.tema);
    }else{
      // console.log('usando valores de tema por defecto');
      this.aplicarTema(this.ajustes.tema);
    }
  }

  aplicarTema(tema: string){

    let url = `assets/css/colors/${tema}.css`;
    this._document.getElementById('tema')?.setAttribute('href',url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}

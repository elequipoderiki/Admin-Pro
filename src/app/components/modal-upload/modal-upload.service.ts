import { Injectable, EventEmitter } from '@angular/core';

@Injectable(
  //these lines provide this service for all components
  // {
  // providedIn: 'root'
  // }
)

export class ModalUploadService {

  public tipo!: string | null;
  public id! : string | null;
  public oculto: string = 'oculto';

  public notificacion = new EventEmitter<any>();

  constructor() { 
    console.log('modal upload service listo');
  }

  ocultarModal(){
    this.oculto  = 'oculto';
    this.tipo = null;
    this.id = null;
  }

  mostrarModal(tipo: string, id: string){
    this.oculto  = '';
    this.id = id;
    this.tipo = tipo;
  }
}

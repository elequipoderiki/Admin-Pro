import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [
  ]
})
export class ModalUploadComponent implements OnInit {
  imagenSubir!: File | null;
  imagenTemp!: string | null;

  constructor(public _subirArchivoService: SubirArchivoService, public _modalUploadService : ModalUploadService) { 
  }

  ngOnInit(): void {
  }

  seleccionImage(event:any){
    let archivo = event.target?.files[0];
    if(!archivo){
      this.imagenSubir = null;
      return;
    }
    if(archivo.type.indexOf('image') <0){
      Swal.fire({
        title: 'Se requiere imagen',
        text: "El archivo seleccionado no es una imagen",
        icon: 'error'    
      });
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemp = reader.result?.toString() ?? "";
  }

  subirImagen()
  {
    this._subirArchivoService.subirArchivo(this.imagenSubir!, this._modalUploadService.tipo!, this._modalUploadService.id!)
      .then( resp => {
        //emitting event (photo and user info from server) to warn
        //about some image has changed
        this._modalUploadService.notificacion.emit( resp );
        this.cerrarModal();
      })
      .catch( err => {
        console.log('error en la carga...');
      })
  }

  cerrarModal()
  {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }
}

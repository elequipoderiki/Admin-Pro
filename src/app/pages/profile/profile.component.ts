import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  usuario: Usuario | undefined | null;
  imagenSubir : File | undefined | null;
  imagenTemp!: string;

  constructor(public _usuarioService: UsuarioService) { 
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  guardar(usuario: Usuario)
  {
    this.usuario!.nombre = usuario.nombre;
    if(!this.usuario?.google){
      this.usuario!.email = usuario.email;
    }
    
    this._usuarioService.actualizarUsuario(this.usuario!)
      .subscribe();
  }

  // seleccionImage(archivo: File)
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

  cambiarImagen(){
    this._usuarioService.cambiarImagen(this.imagenSubir!, this.usuario?._id!)
  }

}

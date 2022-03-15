import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import {HttpClient} from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()
export class UsuarioService {

  usuario: Usuario | undefined | null;
  token: string | undefined;

  //import httpclientmodule from service.module is needed too (see service.module 
  //imports) because importings here only have scope for this class whereas 
  //importing httpclientmodule in service.module allow use of that module in templates
  constructor(public http: HttpClient, public router : Router, public _subirArchivoService: SubirArchivoService) { 
    this.cargarStorage();    
  }

  estaLogueado(){
    return (this.token!.length > 5)? true: false;
  }

  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token')!;
      this.usuario = JSON.parse(localStorage.getItem('usuario')!);
    }else{
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  logout(){
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    
    this.router.navigate(['/login']);
  }

  loginGoogle(token: string){
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, {token})
      .pipe(
        map((resp:any) => {
          this.guardarStorage(resp.id, resp.token, resp.usuario);
          return true;
        })
      )
  }

  login (usuario : Usuario, recordar: boolean = false) {
    if(recordar){
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    
    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
      .pipe(
        map( (resp:any) => {
          this.guardarStorage(resp.id, resp.token, resp.usuario);
          return true;
        })
      )  
  }

  crearUsuario(usuario: Usuario){
    let url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario)
      .pipe(
        map( (resp:any) => {
          Swal.fire({
            title: "Usuario creado",
            text: usuario.email,
            icon: 'success'    
          });
          return resp.usuario;
        })
      )
  }

  actualizarUsuario(usuario: Usuario){
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    
    return this.http.put(url, usuario)
      .pipe(
        map((resp:any) => {
          if(usuario._id === this.usuario?._id){
            let usuarioDB: Usuario = resp.usuario;
            this.guardarStorage(usuarioDB._id!, this.token!, usuarioDB);
          }
          
          Swal.fire({
            title: "Usuario actualizado",
            text: usuario.nombre?.toString(),
            icon: 'success'    
          });
          return true;
        })
      )
  }

  cambiarImagen(archivo: File , id: string ){
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((resp : any)=> {
        this.usuario!.img = resp.usuario.img;
        Swal.fire({
          title: "Imagen Actualizada",
          text: this.usuario?.nombre!,
          icon: 'success'    
        });
        this.guardarStorage(id, this.token!, this.usuario!);
      })
      .catch(resp => {
        console.log(resp);
      });
  }

  cargarUsuarios(desde: number = 0){
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuarios( termino: string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url)
            .pipe(
              map((resp:any) => resp.usuarios)
            )
  }

  borrarUsuario(id: string){
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url)
      .pipe(
        map(resp => {
          Swal.fire(
            'Borrado!',
            'El Usuario ha sido borrado',
            'success'
          );
          return true;  
        })
      )
  }
}
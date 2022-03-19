import { Injectable } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';

@Injectable()
export class HospitalService {

  totalHospitales: number = 0;

  constructor(public http: HttpClient, 
    public router: Router, 
    public _usuarioService: UsuarioService ) { }

  cargarHospitales(pagina: number){
    let url = URL_SERVICIOS + '/hospital';
    url += "?desde="+pagina;
    return this.http.get(url)
      .pipe(
        map((resp:any) => {
          this.totalHospitales = resp.total;
          return resp.hospitales;
        })
      )
  }

  obtenerHospital(id: string){
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url)
      .pipe(
        map( (resp:any) => resp.hospital)
      )
  }

  borrarHospital(id: string){
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
          .pipe(
            map(resp => {
              Swal.fire(
                'Hospital borrado!',
                'El hospital ha sido borrado',
                'success'
              );
            })
          )
  }

  crearHospital(nombre: string){
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;
    return this.http.post(url, { nombre})
      .pipe(
        map((resp:any) => resp.hospital)
      )
  }

  buscarHospital(termino: string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url)
            .pipe(
              map((resp:any) => resp.hospitales)
            )
  }

  actualizarHospital( hospital: Hospital){
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;
    return this.http.put(url, hospital)
      .pipe(
        map((resp:any) => { 
          Swal.fire(
            'Hospital actualizado!',
            hospital.nombre,
            'success'
          );
          return resp.hospital;
        })
      )
  }
}

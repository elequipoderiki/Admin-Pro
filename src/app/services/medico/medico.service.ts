import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0
  constructor(public http: HttpClient,
    public _usuarioService: UsuarioService) { }

  cargarMedicos(){
    let url = URL_SERVICIOS + '/medico';
    return this.http.get(url)
      .pipe(
        map( (resp:any) => {
            this.totalMedicos = resp.total;
            return this.mapToMedicArray(resp);
          })
      )  
  }

  private mapToMedicArray(resp: any){
    return resp.medicos.map((medic:any) => {
      let medico = medic;
      medico.hospital = medic.hospital.nombre;
      console.log('medico img: '+ medico.img)
      return medico;
    });
  }

  buscarMedicos(termino: string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url)
      .pipe(
        map( (resp:any) => {
          return this.mapToMedicArray(resp);
        })
      );
  }

  cargarMedico(id: string){
    let url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url)
      .pipe(
        map( (resp:any) => resp.medico)
      )
  }

  borrarMedico(id: string){
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
      .pipe(
        map( resp => {
          Swal.fire({
            title: "Médico borrado",
            text: 'Médico borrado correctamente',
            icon: 'success'    
          });
  
          return resp;
        })
      )
  }

  guardarMedico(medico: Medico){
    let url = URL_SERVICIOS + '/medico';
  
    if(medico._id){
      //actualizar
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, medico)
        .pipe(
          map((resp:any) => {
            Swal.fire({
              title: "Médico actualizado",
              text: medico.nombre,
              icon: 'success'    
            });
            return resp.medico;
          })
        )
    } else {
      //crear
      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, medico)
        .pipe(
          map((resp:any) => {
            Swal.fire({
              title: "Médico creado",
              text: medico.nombre,
              icon: 'success'    
            });
  
            return resp.medico;
          })
        )
    }

  }

}

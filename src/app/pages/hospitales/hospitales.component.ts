import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  pagina:number = 0;
  cargando : boolean = false;
  hospitales: Hospital[] = [];

  constructor(public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService) {     
  }

  ngOnInit(): void {
    this.cargarHospitales();
    this._modalUploadService.notificacion
      .subscribe( () => this.cargarHospitales());
  }

  cargarHospitales(){
    this.cargando = true;
    this._hospitalService.cargarHospitales(this.pagina)
      .subscribe( (resp: any) => {
        this.hospitales = resp;
        this.cargando = false;
      })
  }

  buscarHospital(termino: string){
    
    if(termino.length <= 0){
      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarHospital(termino)
      .subscribe(hospitales => this.hospitales = hospitales);
  }
  
  guardarHospital(hospital: Hospital){
    this._hospitalService.actualizarHospital(hospital)
      .subscribe()
  }
  
  borrarHospital(hospital: Hospital){
    this._hospitalService.borrarHospital(hospital._id!)    
      .subscribe( () => this.cargarHospitales());
  }

  cambiarDesde(pagina:number){
    
    let avance = this.pagina + pagina;
    if(avance < 0){
      return;
    }    
    var total = this._hospitalService.totalHospitales;
    if(avance >= total){
      return;
    }
    this.pagina += pagina;
    this.cargarHospitales();
  }

  crearHospital(){
    Swal.fire({
      title: 'Ingrese el nombre del hospital',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Siguiente',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((response:any) => {
      if (!response || response.length === 0) {
        return;
      }else{
        this._hospitalService.crearHospital(response.value)
          .subscribe( () => {
            this.cargarHospitales();
            Swal.fire({
              title: "Hospital "+response.value+" creado!"
            })
          })
      }
    })
  }

  actualizarImagen(hospital: Hospital){
    this._modalUploadService.mostrarModal('hospitales', hospital._id!)    
  }
}

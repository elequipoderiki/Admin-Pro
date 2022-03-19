import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  // totalMedicos: number = 0;
  medicos: Medico[] = []

  constructor(public _medicoService: MedicoService) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos(){
    this._medicoService.cargarMedicos()
      .subscribe(medicos => this.medicos = medicos);
  }

  crearMedico(){}

  borrarMedico(medico: Medico){
    this._medicoService.borrarMedico(medico._id!)
      .subscribe(()=> this.cargarMedicos());
  }

  buscarMedico(termino: string){

    if(termino.length <= 0){
      this.cargarMedicos();
      return;
    }

    this._medicoService.buscarMedicos(termino)
      .subscribe( medicos => this.medicos = medicos)
  }
}

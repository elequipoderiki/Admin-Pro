import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

import {
  AdminGuard,
  LoginGuardGuard,
  SettingsService,
  SharedService,
  SidebarService,
  SubirArchivoService,
  UsuarioService,
  HospitalService,
  MedicoService
} from './service.index'
//note all services coming from service.index file in order to allow service files
//to change location without problems

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AdminGuard,
    LoginGuardGuard,
    SettingsService,
    SharedService,
    SidebarService,
    SubirArchivoService,
    UsuarioService,
    ModalUploadService,
    HospitalService,
    MedicoService
  ]
})
export class ServiceModule { }

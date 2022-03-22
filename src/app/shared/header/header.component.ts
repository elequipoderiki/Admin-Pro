import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`
    .animated.fadeIn{
      --animate-delay: 10s;
      --animate-duration: 10s;
    }
  `]
})
export class HeaderComponent implements OnInit {

  usuario: Usuario |any;

  constructor(public usuarioService: UsuarioService,
    public router: Router) { }

  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario;
  }

  buscar(termino: string){
    this.router.navigate(['/busqueda', termino]);
  }
}

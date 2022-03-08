import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';

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

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

}

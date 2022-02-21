import { Component, OnInit } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { ActivationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrums.component.html',
  styles: [
  ]
})
export class BreadcrumsComponent implements OnInit {

  titulo!: string;
  
  constructor(private router: Router,
      private title: Title,
      private meta: Meta) { 
    this.getDataRoute()
    .subscribe(data => {
      console.log(data);
      this.titulo = data['titulo'];
      this.title.setTitle(this.titulo);
      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.titulo
      };
      this.meta.updateTag(metaTag);
    });
  }

  ngOnInit(): void {
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter(evento => evento instanceof ActivationEnd),
      filter((evento :ActivationEnd | any)=> evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data )
    );

  }
}

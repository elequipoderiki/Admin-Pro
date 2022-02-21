import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { filter, map, retry } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  constructor() { 

    this.subscription = this.regresaObservable().pipe(
      //al recibir error y resuscribirse por retry el contador vuelve a 0 pues 
      //se tratara con nuevo observable, el cual emite contador desde 0
      // retry(2)

      )
      .subscribe( 
        numero => console.log( ' subs ', numero),
        error => console.error('error en obs', error),
        () => console.log('obs finalizo')
      );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
      console.log('la pagina se cierra')
  }

  regresaObservable() : Observable<any>{
    return new Observable( (observer:Subscriber<any>) => {
      
      let contador = 0;

      const intervalo = setInterval( () => {
        // debugger;
        contador ++;

        const salida = {
          valor: contador
        }

        observer.next(salida);

        // if(contador === 3){
        //   clearInterval( intervalo);
        //   observer.complete();
        // }

        // if(contador === 2){
        //   //clearInterval( intervalo);
        //   // debugger;
        //   observer.error('auxilio requerido')
        // }
      }, 1000);
    }).pipe(
      map( resp => resp.valor ),
      filter( ( valor , index) => {
        if( (valor % 2) === 1 ){
          return true
        }else {
          return false
        }
      })
    )
  }
}

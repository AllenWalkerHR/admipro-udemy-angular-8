import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  subscription: Subscription;


  constructor() { 

    this.subscription = this.regresaObservable().subscribe( numero => console.log(numero), error => console.log(error), ()=> console.log('termina'));

  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('Esta pagina se va a cerrar');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any>{
    let obs: Observable<any> = new Observable(  observer => {
      let contador = 0;
      let intervalo = setInterval(() =>{
        contador += 1;

        const salida = {
          valor: contador
        }

        observer.next( salida );

        // if(contador === 3){
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        // if(contador === 2){
        //   //clearInterval(intervalo);
        //   //observer.error('auxilio')
        // }

      },1000);
    }).pipe(
      map(
        (resp:any) =>  resp.valor
      ),
      filter( 
        ( valor, index ) => {
          //alert(valor+' '+index);
          if( (valor % 2) === 1){
            return true;
          }else{
            return false;
          }
        } 
      )
    );
    return obs;
  }

}

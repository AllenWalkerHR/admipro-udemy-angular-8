import { Component, OnInit } from '@angular/core';
import { promise } from 'protractor';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() { 
   

    this.contar3().then( ()=>{
      alert('success')
    } ).catch(
      error => alert('error'+ error)
    );
  }

  ngOnInit() {
  }

  contar3(): Promise<boolean> {

    return new Promise((resolve, reject) => {
      let contador = 0;

      let intervalo = setInterval(() => {
          contador += 1;
          if(contador === 3){
            resolve();
            clearInterval( intervalo );
          }else{
            //reject('mensaje de error')
          }
      }, 1000);
    });
  }

}

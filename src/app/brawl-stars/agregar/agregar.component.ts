import { Component, Input, OnInit } from '@angular/core';
import { Personaje } from '../interfaces/brawl-stars.interface';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: ['input{ display: block; margin: 1em;}']
})
export class AgregarComponent implements OnInit {
  @Input() personajes: Personaje[] = [];
  @Input() nuevo: Personaje={nombre:'', salud:0};
  constructor() {
    
   }

  ngOnInit(): void {
  }

  agregar(){
    
    this.personajes.push(this.nuevo);
    this.nuevo = {
      nombre: "",
      salud: 0
    }
    console.log(this.nuevo.nombre);
  }
}

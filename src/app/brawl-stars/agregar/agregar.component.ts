import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Personaje } from '../interfaces/brawl-stars.interface';
import { BrawlStarsService } from '../services/brawl-stars.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: ['input{ display: block; margin: 1em;}']
})
export class AgregarComponent implements OnInit {
  // Este input nos servía para recibir el array personajes del componente padre
  // Lo eliminamos porque ya no lo vamos a hacer así, ya que lo recibíamos por
  // referencia y eso nos puede generar muchos problemas ya que podríamos modificarlo
  // desde diferentes sitios pudiendo generar inconsistencia
  // @Input() personajes: Personaje[] = [];
  @Input() nuevo: Personaje={nombre:'', salud:0};

  // // Vamos a crearnos un evento. Para ello:
  // // Creamos una propiedad de tipo EventEmitter (OJO al crearlo que sea de @angular/core
  // // ya que vscode me ofrece otro EventEmitter de stream) con el decorador @Output()
  // // En EventEmitter es necesario indicar el tipo de lo que va a "emitir"
  // @Output() onNewCharacter: EventEmitter<Personaje> = new EventEmitter();

  constructor(private bsService:BrawlStarsService) {
    
   }

  ngOnInit(): void {
  }

  agregar(){
    // // Ya no vamos a recibir el array personajes del padre por lo que eliminamos la siguiente
    // // línea
    // //this.personajes.push(this.nuevo);
    // // Ahora que tenemos el nuevo personaje creado lo "emitimos a través del evento"
    // this.onNewCharacter.emit(this.nuevo);
    this.bsService.agregarPersonaje(this.nuevo);
    this.nuevo = {
      nombre: "",
      salud: 0
    }
    
    console.log(this.nuevo.nombre);
  }
}

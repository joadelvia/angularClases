import { Component } from '@angular/core';
import { Personaje } from '../interfaces/brawl-stars.interface';
import { BrawlStarsService } from '../services/brawl-stars.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  
  // personajes: Personaje[] = [];
  nuevo: Personaje={
    nombre: "Toro",
    salud: 5300
  }

  // constructor(private bsService:BrawlStarsService) {
  //   this.personajes = this.bsService.personajes;
  //  }

  
  // // Creamos nuestro método agregarNuevoPersonaje que recibe un personaje a través
  // // del evento y lo añade al array personajes
  // agregarNuevoPersonaje(personaje:Personaje):void{
  //   this.personajes.push(personaje);
  // }


}

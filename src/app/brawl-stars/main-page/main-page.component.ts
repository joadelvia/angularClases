import { Component, OnInit } from '@angular/core';
import { Personaje } from '../interfaces/brawl-stars.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  personajes: Personaje[]=
  [
    {
      nombre: "Shelly",
      salud: 3600
    },
    {
      nombre: "Nita",
      salud: 3800
    },
    {
      nombre: "Colt",
      salud: 2800
    },
    {
      nombre: "Bull",
      salud: 5200
    }
  ]
  nuevo: Personaje={
    nombre: "Bull",
    salud: 5200
  }
  constructor() { }

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
  cambiarNombre(event:any){
    this.nuevo.nombre=event.target.value;
    console.log(this.nuevo.nombre);
  }

}

import { Injectable } from "@angular/core";
import { Personaje } from "../interfaces/brawl-stars.interface";



@Injectable() export class BrawlStarsService {
    private _personajes: Personaje[]=
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

  get personajes():Personaje[]{
    //Podríamos devolve el array pero no lo hacemos porque se pasaría por referencia
    //   return this.personajes;
    return [...this._personajes];
  }
  
    constructor(){
        console.log("Servicio BrawlStars iniciado");
    }

    //Añadir un método que añade un personaje al array
    agregarPersonaje(personaje: Personaje){
        this._personajes.push(personaje);
    }
}
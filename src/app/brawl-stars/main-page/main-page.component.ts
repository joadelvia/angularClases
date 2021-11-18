import { Component, OnInit } from '@angular/core';
interface Personaje{
  nombre: string;
  salud: number;
}
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  
  nuevo: Personaje={
    nombre: "Bull",
    salud: 5200
  }
  constructor() { }

  ngOnInit(): void {
  }

  agregar(){
    
    console.log(this.nuevo.nombre);
  }
  cambiarNombre(event:any){
    this.nuevo.nombre=event.target.value;
    console.log(this.nuevo.nombre);
  }

}

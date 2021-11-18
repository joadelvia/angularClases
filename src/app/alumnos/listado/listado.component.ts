import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  alumnos: string[] = ["Fran","Joaquín","Javier","Cristina","Estefanía"];
  aprobados: string[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  eliminar():void{
    this.aprobados.push(this.alumnos.shift()||'') ;
  }

}

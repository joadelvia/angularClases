import { Component, Input, OnInit } from '@angular/core';
import { Personaje } from '../interfaces/brawl-stars.interface';
import { BrawlStarsService } from '../services/brawl-stars.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css']
})
export class PersonajesComponent implements OnInit {
  //@Input() personajes: Personaje[] = [];
  get personajes():Personaje[]{
    return this.bsService.personajes;
  }
  constructor(private bsService:BrawlStarsService) { }

  ngOnInit(): void {
  }

}

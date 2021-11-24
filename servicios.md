# Servicios
Los servicios nos van a permitir un punto centralizado donde manejar información. En nuestro caso va a ser donde vamos a tener el array personajes y donde se van a realizar todas las operaciones con él, pero más adelante veremos servicios que se conectan con apis externas.
## Creación servicio
El primer paso como siempre va a ser intentar mantener el proyecto organizado, por lo que vamos a crear una carpeta services dentro de nuestro módulo.
Dentro de ella crearemos un fichero brawl-stars.service.ts, recordamos que no es obligatorio utilizar .service, pero es una práctica recomendada. Como siempre en Angular, los ficheros ts contienen una clase con un decorador. En este caso creamos la clase BrawlStarsService con el decorador @Injectable.

```typescript
    import { Injectable } from "@angular/core";

    @Injectable() export class BrawlStarsService {
        constructor(){
            console.log("Servicio creado");
        }
    }
```

Hemos creado el servicio y simplemente le hemos puesto un console.log en el constructor porque queremos ver que el servicio no se crea hasta que algún componente lo utiliza y además veremos como aunque lo llamen desde varios componentes el servicio se crea una única vez.
## Declaración del servicio en el módulo.
Para poder utilizar el servicio, primero debemos declararlo en el módulo, para ello vamos a brawl-stars.module.ts y añadimos la propiedad providers en el decorador y declaramos el servicio BrawlStarsService, además esto nos lo importará.
```typescript
    import { NgModule } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { MainPageComponent } from './main-page/main-page.component';
    import { FormsModule } from '@angular/forms';
    import { PersonajesComponent } from './personajes/personajes.component';
    import { AgregarComponent } from './agregar/agregar.component';
    import { BrawlStarsService } from './services/brawl-stars.service';

    @NgModule({
        declarations: [
            MainPageComponent,
            PersonajesComponent,
            AgregarComponent
        ],
        exports:[
            MainPageComponent
        ],
        imports: [
            CommonModule,
            FormsModule
        ],
        providers: [
            BrawlStarsService
        ]
    })
    export class BrawlStarsModule { }
```

Si ahora iniciamos el proyecto y vamos a la consola, podemos ver que en ningún caso se inicia todavía el servicio, ya que ningún componente ha hecho uso de él.
## Inyección del servicio en un componente
Para poder ver como funciona el servicio lo vamos a utilizar desde el componente principal. Para ello necesitamos utilizar lo que se llama inyección de dependencias. Esto se realiza pasándole otro objeto al constructor:
```typescript
    import { Component } from '@angular/core';
    import { Personaje } from '../interfaces/brawl-stars.interface';
    import { BrawlStarsService } from '../services/brawl-stars.service';

    @Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css']
    })
    export class MainPageComponent {
    personajes: Personaje[] =
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
    nuevo: Personaje = {
        nombre: "Toro",
        salud: 5300
    }
    constructor( private bsService: BrawlStarsService ) { }

    // Creamos nuestro método agregarNuevoPersonaje que recibe un personaje a través
    // del evento y lo añade al array personajes
    agregarNuevoPersonaje(personaje: Personaje): void {
        this.personajes.push(personaje);
    }


    }
```

Ahora si podemos ver que se lanza el mensaje en la consola porque se crea el servicio. Podemos añadir el servicio de la misma forma al componente personajes para ver que el servicio solo se inicializa una única vez.

## Pasando la lógica al servicio
Al principio hemos dicho que la idea de los servicios es que gestionen toda la lógica relacionada con la información, para ello vamos a eliminar del componente main-page todo lo relacionado con personajes y lo vamos a pasar al servicio. Además vamos a obtener el array personajes del servicio, para ello podemos crear una propiedad personajes como un array personajes e inicializarla en el constructor obteniendo los datos del servicio o podemos simplemente crear un get y obtenerlo del servicio.
```typescript
    import { Component } from '@angular/core';
    import { Personaje } from '../interfaces/brawl-stars.interface';
    import { BrawlStarsService } from '../services/brawl-stars.service';

    @Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css']
    })
    export class MainPageComponent {
        
    nuevo: Personaje = {
        nombre: "Toro",
        salud: 5300
    }
    /*
    Opción con propiedad y constructor:
    personajes: Personajes [];
    constructor (private bsService: BrawlStarsService ) {
        this.personajes = this.bsService.personajes;
    }
    */
    //Opción con get
    get personajes():Personaje[]{
        return this.bsService.personajes;
    }

    constructor( private bsService: BrawlStarsService ) { }

    agregarNuevoPersonaje(personaje: Personaje){
        this.personajes.push(personaje);
    }

    }
```

Bien ya vemos como funciona el servicio, pero si lo pensamos bien, nosotros no necesitamos para nada el array personajes en el componente principal y además hemos dicho que ibamos a pasar toda la lógica al servicio, por lo que vamos a eliminar todo lo que no vamos a utilizar:
main-page.component.ts
```typescript
import { Component } from '@angular/core';
import { Personaje } from '../interfaces/brawl-stars.interface';
import { BrawlStarsService } from '../services/brawl-stars.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
    
  nuevo: Personaje = {
    nombre: "Toro",
    salud: 5300
  }
  
  constructor(){}

}
```
main-page.component.html
```html
<h1>Brawl Stars</h1>
<hr>
<div class="row">
    <div class="col">
        <app-personajes></app-personajes>
    </div>
    
    <div class="col">
        <app-agregar [nuevo]='nuevo'></app-agregar>
    </div>
</div>
```

Ahora vamos a pasar la lógica al servicio, para ello lo primero de todo es hacer que personajes sea una propiedad privada, ya que no queremos que desde ningún componente se pueda modificar y solo queremos que sea manipulable por el propio servicio. Además debemos añadir un get para poder obtener el listado de personajes desde fuera, pero en lugar de devolver el propio array (recordemos que lo pasaría por referencia) vamos a utilizar el operador spread para devolver un nuevo array con los mismos elementos.
```typescript
import { Injectable } from "@angular/core";
import { Personaje } from "../interfaces/brawl-stars.interface";


@Injectable() export class BrawlStarsService{
    private _personajes: Personaje[] =
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
    constructor(){
        console.log("Servicio BrawlStars creado");
    }

    get personajes():Personaje[]{
        //no vamos a devolver el array porque se pasaría por referencia
        //return this.personajes;
        //En su lugar utilizaremos el operador spread
        return [...this.personajes];
    }
}
```

Bien ahora para obtener poder obtenerlo desde el componente personajes simplemente le crearemos un get como hicimos antes en el componente main-page.
```typescript
    import { Component, Input } from '@angular/core';
    import { Personaje } from '../interfaces/brawl-stars.interface';
    import { BrawlStarsService } from '../services/brawl-stars.service';

    @Component({
    selector: 'app-personajes',
    templateUrl: './personajes.component.html',
    styleUrls: ['./personajes.component.css']
    })
    export class PersonajesComponent {
    //@Input() personajes: Personaje[] = [];
    get personajes():Personaje[]{
        return this.bsService.personajes;
    }
    constructor( private bsService: BrawlStarsService) { }


    }
```

Lo último que nos falta es añadir al servicio la posibilidad de añadir nuevos personajes al array personajes. Para ello deberemos crear un método dentro del servicio.
brawl-stars.service.ts
```typescript
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
```

Lo último será llamar ese método desde el componente agregar. Para ello lo primero que hacemos en inyectar el servicio, añadiéndolo al constructor y después simplemente utilizamos el método creado en el servicio pasándole nuestro objeto nuevo.
agregar.component.ts
```typescript
import { Component, Input } from '@angular/core';
import { Personaje } from '../interfaces/brawl-stars.interface';
import { BrawlStarsService } from '../services/brawl-stars.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: ['input{ display: block; margin: 1em;}']
})
export class AgregarComponent  {
  
  @Input() nuevo: Personaje={nombre:'', salud:0};

    constructor(private bsService:BrawlStarsService) {
    
   }

  agregar(){
    this.bsService.agregarPersonaje(this.nuevo);
    this.nuevo = {
      nombre: "",
      salud: 0
    }
  }
}
```

## Ejercicio
Crear un nuevo proyecto Angular donde vamos a intentar poner en práctica todo lo visto hasta ahora. Para ello, el proyecto deberá tener al menos un módulo en el que habrán los componentes necesarios para que tengamos al menos dos servicios diferentes donde almacenemos información y la podamos consultar y añadir nuevos objetos. Para esto último tendremos componentes que permitan mediante formularios añadir información y componentes que muestren la información. Intentar utilizar todo lo aprendido, diferentes directivas, clases y podéis tratar de "jugar" con mostrar y ocultar componentes.
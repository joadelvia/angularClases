import { Component } from "@angular/core";


@Component({
    selector: 'app-contador',
    template: `
    <h1> {{title}} </h1>
<button (click)="acumula(+1)">+1</button>
<p>{{acumulador}}</p>
<button (click)="acumula(-1)">-1</button>
    `
})
export class ContadorComponent {
    title: string = 'Acumulador';
    acumulador: number = 0;

    acumula(incremento: number) {
        this.acumulador += incremento;
    }
}
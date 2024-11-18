import { Component, OnInit } from '@angular/core';
import { DestinoService } from '@services/destino.service';
import { RouterLink, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-destino',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './destino.component.html',
  styleUrl: './destino.component.css',
})
export class DestinoComponent {
  constructor(public destinoService: DestinoService,
    public router: Router, 
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  control: boolean = true;

  destinos: any[] = [];
  america: any[] = [];
  europa: any[] = [];

  ngOnInit(): void {

    this.destino();
    setTimeout(() => {
      this.destino();
    }, 2);

    //Actualiza la vista de la página cuando se carga la info de la BBDD
    this.changeDetectorRef.detectChanges();
  }

  async destino() {
    sessionStorage.getItem('destinoAmerica') === 'Bora Bora'
      ? (this.control = false)
      : (this.control = true);

    // Llamado al método GET para obtener la información de los destinos seleccionados
    // Se envía como parámetro el nombre de los destinos seleccionados guardado en el sessionStorage 
    await this.destinoService
      .getDestinity(
        `v1/searchName/${sessionStorage.getItem(
          'destinoAmerica'
        )}/${sessionStorage.getItem('destinoEuropa')}`
      )

      //Se recibe la respuesta y se almacena en un array
      .then((response) => {
        this.destinos = response;
        this.filtrarDestinos();
        console.log(response);
      })
      .catch((error) => {
        console.error('Error', error);
      });

  }
  //Se separan los destinos por continente
  filtrarDestinos(): void {
    this.america = this.destinos.filter(
      (destino) => destino.continente === 'América'
    );
    this.europa = this.destinos.filter(
      (destino) =>
        destino.continente === 'Europa' || destino.continente === 'Asia'
    );
  }
}

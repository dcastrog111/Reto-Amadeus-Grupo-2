
import { Component, importProvidersFrom } from '@angular/core';
import { DestinoService } from '@services/destino.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css',
})
export class ResultadosComponent {
  constructor(public destinoService: DestinoService) {}

  destinoAmerica = '';
  destinoEuropa = '';
  pDestino = this.destinoService.respuestasSer[0];
  // pNanInt = "Nacional";
  pClimatica = this.destinoService.respuestasSer[1];
  // pLluvia = "Clima seco";
  pActividad = this.destinoService.respuestasSer[2];
  // pGastronomia = "Comida Local";
  pAlojamiento = this.destinoService.respuestasSer[3];
  // pCentroAfueras = "Centro de la Ciudad";
  dViaje = this.destinoService.respuestasSer[4];
  // pDescanso = "1-2 días act.intensas";
  edad = this.destinoService.respuestasSer[5];

  volverAtras() {
    this.destinoService.indice = 5;
    this.destinoService.respuestasSer.pop();
  }

  //Se llama al método POST para enviar las respuestas seleccionadas por el usuario
  async enviarDestino() {
    // Llama al método `sendDestinity` del servicio `DestinoService`, enviando un objeto con las respuestas seleccionadas
    await this.destinoService
      .sendDestinity('/v1/enviarDestino', {
        // Parámetros que se envían en el cuerpo de la solicitud POST
        destino: this.destinoService.respuestasSer[0],
        climatica: this.destinoService.respuestasSer[1],
        actividad: this.destinoService.respuestasSer[2],
        alojamiento: this.destinoService.respuestasSer[3],
        viaje: this.destinoService.respuestasSer[4],
        edad: this.destinoService.respuestasSer[5],
        //El id del usuario se obtiene del sessionStorage
        userId: sessionStorage.getItem("id")
      })
      .then((response) => {
        this.destinoService.destinoA = response.destinoA;
        this.destinoService.destinoE = response.destinoE;
        sessionStorage.setItem('destinoAmerica', response.destinoA);
        sessionStorage.setItem('destinoEuropa', response.destinoE);
        console.log('Destino A:', this.destinoService.destinoA);
        console.log('Destino E:', this.destinoService.destinoE);
      })
      .catch((error) => {
        console.error('Error al enviar destino:', error);
      });

    if (this.destinoService.destinoA == '') {
      this.destinoService.destinoA = 'Bora Bora';
      this.destinoService.destinoE = 'Dubái';
    }
  }
}

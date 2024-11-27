import { Component } from '@angular/core';
import { DestinoService } from '@services/destino.service';
import { RouterLink } from '@angular/router';
import { SharedDataService } from '@services/share-data.service';

@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './planes.component.html',
  styleUrl: './planes.component.css'
})
export class PlanesComponent {
  america: any[] = [];
  europa: any[] = [];
  hotelName: string = '';
  description: string = '';
  imgHotel: string = '';
  img: string = '';
  name: string = '';
  urlHotel: string = '';


  constructor(public destinoService: DestinoService
    , private sharedDataService: SharedDataService
  ){
    this.america = this.sharedDataService.getAmerica();
    this.europa = this.sharedDataService.getEuropa();
    this.extractHotelDetails();
  }
  
  extractHotelDetails(): void {
    const selectedContinent = sessionStorage.getItem('selectedContinent');
    if (selectedContinent === 'America' && this.america.length > 0) {
      const hotel = this.america[0];
      this.hotelName = hotel.nombreHotel;
      this.description = hotel.descripcionHotel;
      this.imgHotel = encodeURI(hotel.imgHotel);
      this.img = encodeURI(hotel.img);
      this.name = hotel.nombreDestino;
      this.urlHotel = hotel.urlHotel;
    } else if (selectedContinent === 'Europa' && this.europa.length > 0) {
      const hotel = this.europa[0];
      this.hotelName = hotel.nombreHotel;
      this.description = hotel.descripcionHotel;
      this.imgHotel = encodeURI(hotel.imgHotel);
      this.img = encodeURI(hotel.img);
      this.urlHotel = hotel.urlHotel;
    }
  }
}

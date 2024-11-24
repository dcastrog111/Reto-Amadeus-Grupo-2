import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private america: any[] = [];
  private europa: any[] = [];
  private hotelName: string = '';
  private description: string = '';
  private img: string = '';

  setAmerica(data: any[]): void {
    this.america = data;
  }

  getAmerica(): any[] {
    return this.america;
  }

  setEuropa(data: any[]): void {
    this.europa = data;
  }

  getEuropa(): any[] {
    return this.europa;
  }

  setHotelName(name: string): void {
    this.hotelName = name;
  }

  getHotelName(): string {
    return this.hotelName;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  getDescription(): string {
    return this.description;
  }

  setImg(img: string): void {
    this.img = img;
  }

  getImg(): string {
    return this.img;
  }
}
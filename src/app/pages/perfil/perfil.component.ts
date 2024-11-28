import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { DestinoService } from '@services/destino.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

/**
 * Enumeración de imágenes de avatar para seleccionar una imagen de avatar
 * en el componente PerfilComponent. Esto nos permite seleccionar una imagen
 * de avatar de forma más sencilla y segura. Ademas, si se desea hacer cambios
 * en las imágenes de avatar, solo se debe modificar el enum AvatarImages.
 */

enum AvatarImages {
  AVATAR1 = 'assets/img/img-avatar/ava11.png',
  AVATAR2 = 'assets/img/img-avatar/ava12.png',
  AVATAR3 = 'assets/img/img-avatar/ava13.png',
  AVATAR4 = 'assets/img/img-avatar/ava14.png',
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements AfterViewInit {
  // Seleccionar elementos del DOM con @ViewChildren para evitar manipulación directa del DOM
  @ViewChildren('slidesElements') slidesElements!: QueryList<ElementRef>;
  @ViewChildren('dotElement') dotElemets!: QueryList<ElementRef>;

  constructor(public destinoService: DestinoService, public router:Router) {}

  slideIndex: number = 1;

  // ngAfterViewInit se ejecuta después de que Angular haya inicializado las vistas del componente
  ngAfterViewInit(): void {
    this.showSlides(this.slideIndex);
  }

  plusSlides(n: number): void {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n: number): void {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n: number): void {
    /**
     * Convertir QueryList en un array para poder iterar sobre cada elemento del DOM,
     * en este caso los slides y los dots.
     */
    const slides = this.slidesElements.toArray();
    const dots = this.dotElemets.toArray();

    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }

    slides.forEach((slide) => {
      slide.nativeElement.style.display = 'none';
    });

    dots.forEach((dot) => {
      dot.nativeElement.className = dot.nativeElement.className.replace(
        ' active',
        ''
      );
    });

    slides[this.slideIndex - 1].nativeElement.style.display = 'block';
    dots[this.slideIndex - 1].nativeElement.className += ' active';
  }

  nombre = new FormControl();
  correo = new FormControl();

  async datosUsuario(){

    //this.destinoService.nombreS = this.nombre.value;
    //this.destinoService.correoS = this.correo.value;

    //Creación de objeto para enviar datos de usuario
    let objUsuario = {
      name: this.nombre.value,
      email: this.correo.value,
    }

    //Se llama al método POST del servicio para enviar los datos del usuario
    await this.destinoService
        .sendDestinity('/v1/user', objUsuario)
        .then((response) => {
                  //Se almacenan los datos del usuario en el sessionStorage
                  window.sessionStorage.setItem("nombre", response.name);
                  window.sessionStorage.setItem("email",response.email);
                  window.sessionStorage.setItem("id", response.id);
                });

    // let numeroAvatar = AvatarImages.AVATAR1;
    switch(this.slideIndex){
      case 1: {
        this.destinoService.avatar = AvatarImages.AVATAR1;
        break;
      }
      case 2: {
        this.destinoService.avatar = AvatarImages.AVATAR2;
        break;
      }
      case 3: {
        this.destinoService.avatar = AvatarImages.AVATAR3;
        break;
      }
      case 4: {
        this.destinoService.avatar = AvatarImages.AVATAR4;
        break;
      }
    }

    //Se almacena la ruta de imagen de avatar seleccionada en el sessionStorage
    window.sessionStorage.setItem("avatar", String(this.destinoService.avatar));

    //Se redirige a la página de tarjetas despues de actualziar info de usuario
    this.router.navigate(["/tarjetas"])

  }

  estadoCorreo = "";
  controlBoton = true;

  verificarNomb(event: Event){

    let nomUsuario = this.nombre.value;

    if (nomUsuario == ""){
      this.estadoCorreo = 'Escribe su nombre';
    }
  }


  verificarCorreo(event: Event): void {

    const regEmail = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    const correoUsuario = this.correo.value;

    const checkbox = document.getElementById('data-accepted') as HTMLInputElement;

    if (!regEmail.test(correoUsuario) || !checkbox.checked) {
      if (!regEmail.test(correoUsuario)) {
        this.estadoCorreo = 'Correo no válido';
      } else if (!checkbox.checked) {
        this.estadoCorreo = 'Debe aceptar los términos y condiciones';
      }
      this.controlBoton = true;
    } else {
      this.estadoCorreo = '';
      this.controlBoton = false;
    }

    // Ensure the checkbox value is updated correctly
    checkbox.addEventListener('change', () => {
      this.verificarCorreo(event);
    });
  }

}

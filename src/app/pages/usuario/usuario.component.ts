import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { DestinoService } from '@services/destino.service';
import { filter, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit, OnDestroy {

  constructor(public destinoService: DestinoService, public router: Router){}

  private routerSubscription!: Subscription;

  esVisible = signal(false);
  avatar: any;
  nombre: any;
  correo: any;
  ruta: String = "";

  ngOnInit(): void {
    
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.obtenerDatosUsuario()
        this.ruta = this.router.url;        
      });
  }

  obtenerDatosUsuario(){
    //Datos de usuario guardados en sessionStorage se asignan a las variables del componente usuario
    this.nombre = window.sessionStorage.getItem('nombre');
    this.correo = window.sessionStorage.getItem('email');

    //Si no hay seleccionado un avatar, se le asigna uno por defecto
    if (window.sessionStorage.getItem('avatar') != null)
      this.avatar = window.sessionStorage.getItem('avatar');
    if(this.router.url == "/index")
      this.avatar = "https://cdn-icons-png.flaticon.com/512/9187/9187532.png";
  }

  handleVisible(){
    this.esVisible.set(!this.esVisible());
  }

  cerrarSesion(){
    //Al cerrar sesión se eliminan las selecciones del array de respuestas
    this.destinoService.indice = 0;
    let longitud = this.destinoService.respuestasSer.length;

    for(let i = 0; i <= longitud; i++){
      this.destinoService.respuestasSer.pop();

    }
    //Al cerrar sesión se eliminan los datos de usuario guardados en sessionStorage
    window.sessionStorage.clear();
    window.sessionStorage.setItem("avatar", "https://cdn-icons-png.flaticon.com/512/9187/9187532.png");
    this.router.navigate(["/index"])
  }


  ngOnDestroy(): void {
    // Nos aseguramos de cancelar la suscripción para evitar fugas de memoria
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}

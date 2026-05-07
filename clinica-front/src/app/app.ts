import { Component, OnInit } from '@angular/core'; // Añadimos OnInit
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  nombreUsuario: string | null = null;

  constructor(public router: Router) {}

  ngOnInit() {
    // Al cargar la app, revisamos si hay alguien logeado
    this.nombreUsuario = localStorage.getItem('usuarioLogeado');
  }

  irALogin() {
    this.router.navigate(['/login']);
  }

  irAInicio() {
    this.router.navigate(['/']);
  }

  cerrarSesion() {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: "Tendrás que ingresar tus datos de nuevo para acceder.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#007acc',
      cancelButtonColor: '#ff4d4d',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('usuarioLogeado');
        this.nombreUsuario = null;
        this.router.navigate(['/']);
      }
    });
  }
}

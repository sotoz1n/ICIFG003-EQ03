import { Component, OnInit } from '@angular/core'; // Añadimos OnInit
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';

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
    localStorage.removeItem('usuarioLogeado');
    this.nombreUsuario = null;
    this.router.navigate(['/']);
  }
}
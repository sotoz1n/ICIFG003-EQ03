import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  nombreUsuario: string | null = null;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.nombreUsuario = localStorage.getItem('usuarioLogeado');
      }
    });
    this.nombreUsuario = localStorage.getItem('usuarioLogeado');
  }

  irALogin() {
    this.router.navigate(['/registro']);
  }

  irAInicio() {
    this.router.navigate(['/']);
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioLogeado');
    localStorage.removeItem('rol');
    this.nombreUsuario = null;
    this.router.navigate(['/']);
  }
}
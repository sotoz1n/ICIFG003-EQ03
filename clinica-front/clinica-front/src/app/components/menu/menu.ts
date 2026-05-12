import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.html'
})
export class MenuComponent implements OnInit {
  nombreUsuario: string | null = '';
  // Variable para verificar si es administrador
  esAdmin: boolean = false; 

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('usuarioLogeado');
    
    // Verificamos el rol guardado durante el login
    const rolUsuario = localStorage.getItem('rol');
    this.esAdmin = (rolUsuario === 'ADMIN' || rolUsuario === 'admin');
  }

  irAAgendar() {
    this.router.navigate(['/agendar-cita']);
  }

  irAMisCitas() {
    this.router.navigate(['/mis-citas']);
  }

  irATratamientos() {
    this.router.navigate(['/tratamientos']);
  }

  irAResumen() {
    this.router.navigate(['/resumen-diario']);
  }
  
  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
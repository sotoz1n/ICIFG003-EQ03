import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TratamientoService } from '../../services/tratamiento';

@Component({
  selector: 'app-tratamientos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tratamientos.html',
  styleUrls: ['./tratamientos.css']
})
export class TratamientosComponent implements OnInit {
  tratamientos: any[] = [];
  nuevoTratamiento = {
    nombre: '',
    descripcion: '',
    precio: null,
    duracionMinutos: null
  };
  
  mensajeError: string = '';
  mensajeExito: string = '';
  esAdmin: boolean = false;

  constructor(private tratamientoService: TratamientoService, private router: Router) {}

  ngOnInit(): void {
    const rolUsuario = localStorage.getItem('rol');
    this.esAdmin = (rolUsuario === 'ADMIN' || rolUsuario === 'admin');
    
    this.cargarTratamientos();
  }

  cargarTratamientos(): void {
    this.tratamientoService.obtenerTratamientos().subscribe({
      next: (data) => this.tratamientos = data,
      error: (err) => console.error('Error al cargar tratamientos', err)
    });
  }

  guardar(): void {
    this.mensajeError = '';
    this.mensajeExito = '';
    
    const { nombre, descripcion, precio, duracionMinutos } = this.nuevoTratamiento;
    if (!nombre || !descripcion || !precio || !duracionMinutos) {
      this.mensajeError = 'Por favor, todos los campos son obligatorios.';
      return; 
    }

    this.tratamientoService.guardarTratamiento(this.nuevoTratamiento).subscribe({
      next: (res) => {
        this.mensajeExito = '¡Tratamiento guardado con éxito!';
        this.cargarTratamientos(); 
        this.nuevoTratamiento = { nombre: '', descripcion: '', precio: null, duracionMinutos: null };
      },
      error: (err) => {
        const mensajeBackend = err.error?.message || err.error;
        this.mensajeError = typeof mensajeBackend === 'string' ? mensajeBackend : 'Error al guardar el tratamiento.';
      }
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar este tratamiento del catálogo?')) {
      this.tratamientoService.eliminarTratamiento(id).subscribe({
        next: () => {
          this.mensajeExito = 'Tratamiento eliminado.';
          this.cargarTratamientos();
        },
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }

  volverAlMenu(): void {
    this.router.navigate(['/menu']);
  }
}
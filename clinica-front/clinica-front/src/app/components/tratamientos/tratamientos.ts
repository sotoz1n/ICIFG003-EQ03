import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TratamientoService } from '../../services/tratamiento';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tratamientos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tratamientos.html'
})
export class TratamientosComponent implements OnInit {
  tratamientos: any[] = [];
  
  nuevoTratamiento: any = {
    id: null,
    nombre: '',
    descripcion: '',
    precio: 0,
    duracionMinutos: 0
  };

  editando: boolean = false;
  esAdmin: boolean = false;

  constructor(
    private tratamientoService: TratamientoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const rol = localStorage.getItem('rol');
    this.esAdmin = (rol === 'ADMIN' || rol === 'admin');
    this.cargarTratamientos();
  }

  cargarTratamientos(): void {
    this.tratamientoService.obtenerTratamientos().subscribe({
      next: (data) => {
        this.tratamientos = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  editar(t: any): void {
    this.editando = true;
    this.nuevoTratamiento = { ...t };
    this.cdr.detectChanges();
  }

  guardar(): void {
    if (this.editando) {
      this.tratamientoService.actualizarTratamiento(this.nuevoTratamiento.id, this.nuevoTratamiento).subscribe({
        next: () => {
          Swal.fire('Actualizado', 'Tratamiento modificado con éxito', 'success');
          this.resetearFormulario();
        },
        error: () => Swal.fire('Error', 'No se pudo actualizar', 'error')
      });
    } else {
      this.tratamientoService.crearTratamiento(this.nuevoTratamiento).subscribe({
        next: () => {
          Swal.fire('Creado', 'Nuevo tratamiento añadido', 'success');
          this.resetearFormulario();
        },
        error: () => Swal.fire('Error', 'No se pudo crear', 'error')
      });
    }
  }

  eliminar(id: number): void {
    Swal.fire({
      title: '¿Eliminar?',
      text: "Se borrará del catálogo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tratamientoService.eliminarTratamiento(id).subscribe({
          next: () => {
            Swal.fire('Borrado', 'Tratamiento eliminado', 'success');
            this.cargarTratamientos();
          }
        });
      }
    });
  }

  resetearFormulario(): void {
    this.editando = false;
    this.nuevoTratamiento = { id: null, nombre: '', descripcion: '', precio: 0, duracionMinutos: 0 };
    this.cargarTratamientos();
  }

  irAMenu(): void {
    this.router.navigate(['/menu']);
  }
}
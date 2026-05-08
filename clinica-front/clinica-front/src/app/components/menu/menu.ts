import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api'; 

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class MenuComponent implements OnInit {
  citas: any[] = [];
  nuevaCita = {
    nombrePaciente: '',
    correo: '',
    tratamiento: '',
    fecha: '',
    hora: ''
  };
  
  mensajeError: string = '';
  mensajeExito: string = '';
  
  // Variable para controlar la visibilidad del botón eliminar
  esAdmin: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Verificamos el rol al cargar el componente
    const rolUsuario = localStorage.getItem('rol');
    this.esAdmin = (rolUsuario === 'ADMIN' || rolUsuario === 'admin');
    
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.apiService.obtenerCitas().subscribe({
      next: (data) => this.citas = data,
      error: (err) => console.error('Error al cargar citas', err)
    });
  }

  agendar(): void {
    this.mensajeError = '';
    this.mensajeExito = '';
    
    const { nombrePaciente, correo, tratamiento, fecha, hora } = this.nuevaCita;
    if (!nombrePaciente || !correo || !tratamiento || !fecha || !hora) {
      this.mensajeError = 'Por favor, todos los campos deben ser rellenados obligatoriamente.';
      return; 
    }

    const fechaSeleccionada = new Date(`${fecha}T${hora}`);
    const ahora = new Date();
    if (fechaSeleccionada < ahora) {
      this.mensajeError = 'No puedes agendar una cita en una fecha u hora que ya pasó.';
      return;
    }
    
    this.apiService.agendarCita(this.nuevaCita).subscribe({
      next: (res) => {
        this.mensajeExito = '¡Cita agendada con éxito!';
        this.cargarCitas(); 
        this.nuevaCita = { nombrePaciente: '', correo: '', tratamiento: '', fecha: '', hora: '' };
      },
      error: (err) => {
        const mensajeBackend = err.error?.message || err.error;
        this.mensajeError = typeof mensajeBackend === 'string' ? mensajeBackend : 'Error en la disponibilidad del horario.';
      }
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta cita?')) {
      this.apiService.eliminarCita(id).subscribe({
        next: () => {
          this.mensajeExito = 'Cita eliminada.';
          this.cargarCitas();
        },
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }
}
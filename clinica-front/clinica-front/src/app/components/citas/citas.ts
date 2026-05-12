import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Importamos ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from '../../services/api';
import { TratamientoService } from '../../services/tratamiento';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './citas.html'
})
export class CitasComponent implements OnInit {
  citas: any[] = [];
  tratamientosDisponibles: any[] = [];
  
  nuevaCita: any = {
    id: null,
    nombrePaciente: '',
    correo: '',
    tratamiento: '',
    fecha: '',
    hora: '',
    usuario: { id: 1 }
  };

  soloLectura: boolean = false;
  editando: boolean = false;

  constructor(
    private apiService: ApiService, 
    private router: Router,
    private tratamientoService: TratamientoService,
    private cdr: ChangeDetectorRef
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.verificarModoLectura();
    });
  }

  ngOnInit(): void {
    this.verificarModoLectura(); 
    this.cargarCitas();
    this.cargarCatalogo();
  }

  verificarModoLectura(): void {
    const urlCompleta = window.location.href; 

    if (urlCompleta.includes('/mis-citas')) { 
      this.soloLectura = true;
    } else {
      this.soloLectura = false;
    }
    
    this.cdr.detectChanges(); 
  }

  cargarCatalogo(): void {
    this.tratamientoService.obtenerTratamientos().subscribe({
      next: (data) => this.tratamientosDisponibles = data,
      error: (err) => console.error('Error al cargar el catálogo', err)
    });
  }

  cargarCitas(): void {
    this.apiService.obtenerCitas().subscribe({
      next: (data) => {
        this.citas = data || []; 
        console.log("Citas cargadas:", this.citas);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar', err)
    });
  }

  validarCorreo(correo: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(correo);
  }

  guardar(): void {
    if (!this.validarCorreo(this.nuevaCita.correo)) {
      Swal.fire('Correo Inválido', 'Solo se permiten correos @gmail.com', 'error');
      return;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaCita = new Date(this.nuevaCita.fecha + 'T00:00:00');
    const horaSeleccionada = parseInt(this.nuevaCita.hora.split(':')[0]);

    if (fechaCita < hoy) {
      Swal.fire('Fecha inválida', 'No puedes agendar en días pasados.', 'error');
      return;
    }
    if (horaSeleccionada < 9 || horaSeleccionada >= 18) {
      Swal.fire('Horario no permitido', 'Atención de 09:00 a 18:00.', 'warning');
      return;
    }

    if (this.editando) {
      this.apiService.actualizarCita(this.nuevaCita.id, this.nuevaCita).subscribe({
        next: () => {
          Swal.fire('Actualizado', 'La cita se modificó correctamente', 'success');
          this.resetearFormulario();
        },
        error: (err) => Swal.fire('Error', 'No se pudo actualizar la cita', 'error')
      });
    } else {
      this.apiService.agendarCita(this.nuevaCita).subscribe({
        next: () => {
          Swal.fire('Agendado', 'Cita creada con éxito', 'success');
          this.resetearFormulario();
        },
        error: (err) => {
          const mensaje = typeof err.error === 'string' ? err.error : 'Error al agendar';
          Swal.fire('Atención', mensaje, 'error');
        }
      });
    }
  }

  editar(cita: any): void {
    this.editando = true;
    this.soloLectura = false; 
    this.nuevaCita = { ...cita }; 
    this.cdr.detectChanges();
  }

  eliminar(id: number): void {
    Swal.fire({
      title: '¿Eliminar cita?',
      text: "Esta acción es irreversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.apiService.eliminarCita(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'La cita ha sido borrada', 'success');
            this.cargarCitas();
          }
        });
      }
    });
  }

  resetearFormulario(): void {
    this.editando = false;
    this.verificarModoLectura(); 
    this.nuevaCita = { id: null, nombrePaciente: '', correo: '', tratamiento: '', fecha: '', hora: '', usuario: { id: 1 } };
    this.cargarCitas();
  }

  irAMenu(): void {
    this.router.navigate(['/menu']);
  }
}

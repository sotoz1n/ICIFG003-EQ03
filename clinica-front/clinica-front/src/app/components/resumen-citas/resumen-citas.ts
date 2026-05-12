import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Importamos ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from '../../services/api';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-resumen-citas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen-citas.html'
})
export class ResumenCitasComponent implements OnInit {
  citasAgrupadas: any = {};
  fechas: string[] = [];
  esAdmin: boolean = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef // 2. Inyectamos ChangeDetectorRef
  ) {
    // 3. Escuchamos cambios de ruta para re-validar el acceso admin
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.validarAccesoYAccion();
    });
  }

  ngOnInit(): void {
    this.validarAccesoYAccion();
  }

  // Separamos la lógica de validación para poder llamarla en cualquier momento
  validarAccesoYAccion(): void {
    const rol = localStorage.getItem('rol');
    this.esAdmin = (rol === 'ADMIN' || rol === 'admin');

    if (!this.esAdmin) {
      this.router.navigate(['/menu']);
      return;
    }

    this.cargarYAgruparCitas();
    this.cdr.detectChanges(); // Forzamos actualización inicial
  }

  cargarYAgruparCitas(): void {
    this.apiService.obtenerCitas().subscribe({
      next: (data) => {
        this.citasAgrupadas = {};
        this.fechas = [];
        
        console.log("Resumen - Citas recibidas:", data);
        
        if (data && data.length > 0) {
          this.citasAgrupadas = this.agruparCitas(data);
          this.fechas = Object.keys(this.citasAgrupadas).sort();
        }

        // 4. EL MARTILLO: Obligamos a Angular a dibujar las tablas con los datos nuevos
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error al cargar resumen', err);
      }
    });
  }

  agruparCitas(citas: any[]): any {
    return citas.reduce((acc, cita) => {
      const fecha = cita.fecha || 'Sin Fecha';
      const tratamiento = cita.tratamiento || 'Sin Especificar';

      if (!acc[fecha]) acc[fecha] = {};
      if (!acc[fecha][tratamiento]) acc[fecha][tratamiento] = [];

      acc[fecha][tratamiento].push(cita);
      return acc;
    }, {});
  }

  getTratamientosPorFecha(fecha: string): string[] {
    return this.citasAgrupadas[fecha] ? Object.keys(this.citasAgrupadas[fecha]) : [];
  }

  irAMenu(): void {
    this.router.navigate(['/menu']);
  }
}
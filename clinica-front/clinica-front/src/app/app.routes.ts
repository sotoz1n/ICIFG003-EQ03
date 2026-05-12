import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing';
import { RegistroComponent } from './components/registro/registro';
import { MenuComponent } from './components/menu/menu';
import { CitasComponent } from './components/citas/citas';
import { TratamientosComponent } from './components/tratamientos/tratamientos'; 
import { ResumenCitasComponent } from './components/resumen-citas/resumen-citas';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: RegistroComponent }, 
  { path: 'registro', component: RegistroComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'agendar-cita', component: CitasComponent },
  { path: 'mis-citas', component: CitasComponent },
  { path: 'tratamientos', component: TratamientosComponent },
  { path: 'configuracion', component: MenuComponent }, 
  { path: 'resumen-diario', component: ResumenCitasComponent },
  { path: '**', redirectTo: '' } 
];
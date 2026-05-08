import { Routes } from '@angular/router';
import { RegistroComponent } from './components/registro/registro';
import { MenuComponent } from './components/menu/menu';

export const routes: Routes = [
  { path: 'login', component: RegistroComponent },
  { path: 'menu', component: MenuComponent },
  { path: '', redirectTo: '', pathMatch: 'full' }
];
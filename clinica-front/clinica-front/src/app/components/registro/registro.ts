import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class RegistroComponent {
  usuario = { username: '', password: '' };
  esLogin = true;

  constructor(private apiService: ApiService, private router: Router) {}

  cambiarModo() {
    this.esLogin = !this.esLogin;
  }

  onEnviar() {
    if (this.esLogin) {
      // LOGIN REAL
      this.apiService.loginUsuario(this.usuario).subscribe({
        next: (res) => {
          localStorage.setItem('usuarioLogeado', res.username);
          
          // NUEVO: Guardamos el rol del usuario en el localStorage
          // Asegúrate de que el backend esté devolviendo el objeto Usuario completo al hacer login
          localStorage.setItem('rol', res.rol); 

          alert('Bienvenido ' + res.username);
          // Redirigimos al menú principal en lugar de la landing page
          this.router.navigate(['/menu']).then(() => {
            window.location.reload(); 
          });
        },
        error: (err) => {
          alert('Usuario o contraseña incorrectos');
        }
      });
    } else {
      // REGISTRO REAL
      this.apiService.registrarUsuario(this.usuario).subscribe({
        next: () => {
          alert('Usuario registrado con éxito. Ahora puedes logearte.');
          this.esLogin = true;
          this.usuario.password = '';
        },
        error: (err) => {
          console.error(err);
          alert('Error al conectar con el servidor. Revisa si Spring Boot está corriendo.');
        }
      });
    }
  }
}
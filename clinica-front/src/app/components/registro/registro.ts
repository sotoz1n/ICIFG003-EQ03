import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';
import Swal from 'sweetalert2'; // <--- Importar SweetAlert2

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
      this.apiService.loginUsuario(this.usuario).subscribe({
        next: (res) => {
          localStorage.setItem('usuarioLogeado', res.username);
          
          // Alerta bonita de éxito
          Swal.fire({
            title: '¡Bienvenido!',
            text: `Hola ${res.username}, has iniciado sesión correctamente.`,
            icon: 'success',
            confirmButtonColor: '#007acc'
          }).then(() => {
            this.router.navigate(['/menu']).then(() => {
              window.location.reload(); 
            });
          });
        },
        error: (err) => {
          // Alerta bonita de error
          Swal.fire({
            title: 'Error de acceso',
            text: 'Usuario o contraseña incorrectos',
            icon: 'error',
            confirmButtonColor: '#007acc'
          });
        }
      });
    } else {
      this.apiService.registrarUsuario(this.usuario).subscribe({
        next: () => {
          Swal.fire({
            title: '¡Registro exitoso!',
            text: 'Tu cuenta ha sido creada. Ahora puedes iniciar sesión.',
            icon: 'success',
            confirmButtonColor: '#007acc'
          });
          this.esLogin = true;
          this.usuario.password = '';
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo conectar con el servidor',
            icon: 'error',
            confirmButtonColor: '#007acc'
          });
        }
      });
    }
  }
}
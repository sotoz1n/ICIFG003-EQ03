import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlUsuarios = 'http://localhost:8080/api/usuarios';
  private urlCitas = 'http://localhost:8080/api/citas'; // Nueva URL para el CRUD

  constructor(private http: HttpClient) {}

  // --- MÉTODOS DE USUARIO ---
  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.urlUsuarios}/registro`, usuario);
  }

  loginUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.urlUsuarios}/login`, usuario);
  }

  // --- NUEVOS MÉTODOS DE CITAS ---
  obtenerCitas(): Observable<any> {
    return this.http.get(this.urlCitas);
  }

  agendarCita(cita: any): Observable<any> {
    return this.http.post(this.urlCitas, cita);
  }

  eliminarCita(id: number): Observable<any> {
    return this.http.delete(`${this.urlCitas}/${id}`);
  }
}
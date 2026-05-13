import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'http://localhost:8080/api/citas';

  constructor(private http: HttpClient) {}

  obtenerCitas(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  agendarCita(cita: any): Observable<any> {
    return this.http.post<any>(this.url, cita);
  }

  actualizarCita(id: number, cita: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, cita);
  }

  eliminarCita(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }


  loginUsuario(datos: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/usuarios/login', datos);
  }

  registrarUsuario(datos: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/usuarios/registro', datos);
  }
}
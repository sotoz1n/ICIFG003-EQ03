import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {
  private url = 'http://localhost:8080/api/tratamientos';

  constructor(private http: HttpClient) {}

  obtenerTratamientos(): Observable<any> {
    return this.http.get(this.url);
  }

  guardarTratamiento(tratamiento: any): Observable<any> {
    return this.http.post(this.url, tratamiento);
  }

  eliminarTratamiento(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
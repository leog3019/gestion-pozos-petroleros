import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PozoService {

  private apiUrl = 'http://localhost:3000/api/pozos';

  constructor(private http: HttpClient) { }

  // Obtener todos los pozos
  getPozos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Crear un nuevo pozo
  createPozo(pozo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, pozo);
  }

  // Actualizar el estado de un pozo
  updatePozoState(id: number, estado: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, { estado });
  }
}

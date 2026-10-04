import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { HistorialRespuesta } from '../interfaces/historialRespuesta';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.baseUrl}/transferencias`;

  obtenerHistorial(page: number, size: number): Observable<HistorialRespuesta> {
    return this.http.get<HistorialRespuesta>(
      `${this.apiUrl}?page=${page}&pageSize=${size}`
    );
  }
}

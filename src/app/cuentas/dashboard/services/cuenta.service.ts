import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// import { environment } from '../../environments/environment';
import { RespuestaCuentas } from '../interfaces/respuesta-cuentas';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.baseUrl}/cuentas`;

  obtenerCuentas(page: number, size: number): Observable<RespuestaCuentas> {
  return this.http.get<RespuestaCuentas>(
    `${this.apiUrl}?page=${page}&pageSize=${size}`
  );
}
}

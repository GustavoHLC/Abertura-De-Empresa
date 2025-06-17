import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../model/empresa.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

getEmpresas(): Observable<Empresa[]> {
  return this.http.get<Empresa[]>(`${environment.apiUrl}/empresas`);
}

  getEmpresaById(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.apiUrl}/${id}`);
  }
}

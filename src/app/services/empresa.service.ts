import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa, EntidadeRegistro } from '../model/empresa.model';
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
    return this.http.get<Empresa>(`${this.apiUrl}/empresas/${id}`);
  } 

  criarEmpresa(dados: any): Observable<Empresa> {
    return this.http.post<Empresa>(`${this.apiUrl}/empresas`, dados);
  }

  atualizarEmpresa(id: number, dados: any): Observable<Empresa> {
    return this.http.put<Empresa>(`${this.apiUrl}/empresas/${id}`, dados);
  }

  getEntidadesRegistro(): Observable<EntidadeRegistro[]> {
    return this.http.get<EntidadeRegistro[]>(`${this.apiUrl}/entidade-registro`);
  }

  getEstados(): Observable<any[]> {
    return this.http.get<any[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados/');
  }

  getEnderecoPorCep(cep: string): Observable<any> {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
}

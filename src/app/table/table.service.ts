import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DadosPessoais } from '../model/DadosPessoais';
import { environment } from 'src/environments/environment';
import { Cidades } from '../model/Cidades';
import { Estados } from '../model/Estados';
import { EstadoCivil } from '../model/EstadoCivil';
import { Usuario } from '../model/Usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(private http: HttpClient) {}

  usuario(): Observable<Array<Usuario>> {
    return this.http.get<Array<Usuario>>(`${environment.apiUrl}/usuario`);
  }

  dadosPessoais(): Observable<Array<DadosPessoais>> {
    return this.http.get<Array<DadosPessoais>>(
      `${environment.apiUrl}/dadosPessoais`
    );
  }

  visualizarDadosPessoais(
    dadosPessoais: DadosPessoais
  ): Observable<DadosPessoais> {
    return this.http.get<DadosPessoais>(
      `${environment.apiUrl}/dadosPessoais/${dadosPessoais.id}`
    );
  }

  incluirDadosPessoais(
    dadosPessoais: DadosPessoais
  ): Observable<DadosPessoais> {
    return this.http.post<DadosPessoais>(
      `${environment.apiUrl}/dadosPessoais`,
      dadosPessoais
    );
  }

  atualizarDadosPessoais(
    dadosPessoais: DadosPessoais
  ): Observable<DadosPessoais> {
    return this.http.put<DadosPessoais>(
      `${environment.apiUrl}/dadosPessoais/${dadosPessoais.id}`,
      dadosPessoais
    );
  }

  removerDadosPessoais(
    dadosPessoais: DadosPessoais
  ): Observable<DadosPessoais> {
    return this.http.delete<DadosPessoais>(
      `${environment.apiUrl}/dadosPessoais/${dadosPessoais.id}`
    );
  }

  dadosEstados(): Observable<Array<Estados>> {
    return this.http.get<Array<Estados>>(`${environment.apiUrl}/estados`);
  }

  dadosCidades(): Observable<Array<Cidades>> {
    return this.http.get<Array<Cidades>>(`${environment.apiUrl}/cidades`);
  }

  dadosEstadoCivil(): Observable<Array<EstadoCivil>> {
    return this.http.get<Array<EstadoCivil>>(
      `${environment.apiUrl}/estadoCivil`
    );
  }
}

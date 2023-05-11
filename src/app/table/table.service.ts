import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DadosPessoais } from '../model/DadosPessoais';
import { environment } from 'src/environments/environment';
import { Cidades } from '../model/Cidades';
import { Estados } from '../model/Estados';
import { EstadoCivil } from '../model/EstadoCivil';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(private http: HttpClient) {}

  dadosPessoais() {
    return this.http.get<Array<DadosPessoais>>(
      `${environment.apiUrl}/dadosPessoais`
    );
  }

  visualizarDadosPessoais(dadosPessoais: DadosPessoais) {
    return this.http.get<DadosPessoais>(
      `${environment.apiUrl}/dadosPessoais/${dadosPessoais.id}`
    );
  }

  incluirDadosPessoais(dadosPessoais: DadosPessoais) {
    return this.http.post<DadosPessoais>(
      `${environment.apiUrl}/dadosPessoais`,
      dadosPessoais
    );
  }

  atualizarDadosPessoais(dadosPessoais: DadosPessoais) {
    return this.http.put<DadosPessoais>(
      `${environment.apiUrl}/dadosPessoais/${dadosPessoais.id}`,
      dadosPessoais
    );
  }

  removerDadosPessoais(dadosPessoais: DadosPessoais) {
    return this.http.delete<DadosPessoais>(
      `${environment.apiUrl}/dadosPessoais/${dadosPessoais.id}`
    );
  }

  dadosEstados() {
    return this.http.get<Array<Estados>>(`${environment.apiUrl}/estados`);
  }

  dadosCidades() {
    return this.http.get<Array<Cidades>>(`${environment.apiUrl}/cidades`);
  }

  dadosEstadoCivil() {
    return this.http.get<Array<EstadoCivil>>(
      `${environment.apiUrl}/estadoCivil`
    );
  }
}

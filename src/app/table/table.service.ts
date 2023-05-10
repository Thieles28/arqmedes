import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DadosPessoais } from '../model/DadosPessoais';
import { environment } from 'src/environments/environment';

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
}

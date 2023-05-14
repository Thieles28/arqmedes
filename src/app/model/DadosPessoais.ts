import { Cidades } from './Cidades';
import { EstadoCivil } from './EstadoCivil';
import { Estados } from './Estados';

export class DadosPessoais {
  declare id: number;
  declare nome: string;
  declare cpf: string;
  declare profissao: string;
  declare dataNascimento: string;
  declare estadoCivil: EstadoCivil;
  declare estado: Estados;
  declare cidade: Cidades;
}

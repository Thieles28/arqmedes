/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ListarDadosPessoaisService } from './listarDadosPessoais.service';

describe('Service: ListarDadosPessoaisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListarDadosPessoaisService],
    });
  });

  it('should ...', inject(
    [ListarDadosPessoaisService],
    (service: ListarDadosPessoaisService) => {
      expect(service).toBeTruthy();
    }
  ));
});

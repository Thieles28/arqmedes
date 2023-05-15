/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IncluirDadosPessoais } from './IncluirDadosPessoais';

describe('IncluirDadosPessoais', () => {
  let component: IncluirDadosPessoais;
  let fixture: ComponentFixture<IncluirDadosPessoais>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IncluirDadosPessoais],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncluirDadosPessoais);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

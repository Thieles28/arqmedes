/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VisualizarDadosPessoais } from './removerDadosPessoais';

describe('VisualizarDadosPessoais', () => {
  let component: VisualizarDadosPessoais;
  let fixture: ComponentFixture<VisualizarDadosPessoais>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizarDadosPessoais],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarDadosPessoais);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

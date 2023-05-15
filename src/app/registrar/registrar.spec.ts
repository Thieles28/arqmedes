/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Registrar } from './registrar';

describe('LoginComponent', () => {
  let component: Registrar;
  let fixture: ComponentFixture<Registrar>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Registrar],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Registrar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

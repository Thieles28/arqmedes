import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cidades } from 'src/app/model/Cidades';
import { DadosPessoais } from 'src/app/model/DadosPessoais';
import { EstadoCivil } from 'src/app/model/EstadoCivil';
import { Estados } from 'src/app/model/Estados';
import { ListarDadosPessoaisService } from '../listarDadosPessoais.service';

@Component({
  selector: 'app-incluirDadosPessoais',
  templateUrl: './incluirDadosPessoais.html',
  styleUrls: ['./incluirDadosPessoais.css'],
})
export class IncluirDadosPessoais implements OnInit {
  declare dadosPessoaisForm: FormGroup;
  declare estados: Array<Estados>;
  declare estadosCivil: Array<EstadoCivil>;
  cidades: Array<Cidades> = new Array<Cidades>();
  dadosPessoais: DadosPessoais = new DadosPessoais();

  constructor(
    private listarDadosPessoaisService: ListarDadosPessoaisService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DadosPessoais>,
    @Inject(MAT_DIALOG_DATA) public data: DadosPessoais
  ) {}

  ngOnInit() {
    this.retornaDadosDosEstados();
    this.retornaDadosDoEstadoCivil();
    this.criarDadosPessoaisForm(new DadosPessoais());
    this.recarregaOsDadosPessoaisForm();
  }

  criarDadosPessoaisForm(dadosPessoais: DadosPessoais) {
    this.dadosPessoaisForm = this.fb.group({
      nome: [dadosPessoais.nome, [Validators.required]],
      cpf: [dadosPessoais.cpf, [Validators.required]],
      profissao: [dadosPessoais.profissao, [Validators.required]],
      dataNascimento: [dadosPessoais.dataNascimento, [Validators.required]],
      estadoCivil: [dadosPessoais.estadoCivil, [Validators.required]],
      estado: [dadosPessoais.estado, [Validators.required]],
      cidade: [dadosPessoais.cidade, [Validators.required]],
    });
  }

  atualizarDadosPessoaisForm(dadosPessoais: DadosPessoais) {
    this.dadosPessoaisForm = this.fb.group({
      nome: [dadosPessoais.nome, [Validators.required]],
      cpf: [dadosPessoais.cpf, [Validators.required]],
      profissao: [dadosPessoais.profissao, [Validators.required]],
      dataNascimento: [dadosPessoais.dataNascimento, [Validators.required]],
      estadoCivil: [dadosPessoais.estadoCivil, [Validators.required]],
      estado: [dadosPessoais.estado, [Validators.required]],
      cidade: [dadosPessoais.cidade, [Validators.required]],
    });
  }

  private recarregaOsDadosPessoaisForm() {
    if (this.data != null) {
      this.atualizarDadosPessoaisForm(this.data);
      this.carregarIdEstado(this.data.estado);
    }
  }

  retornaDadosDosEstados() {
    this.listarDadosPessoaisService
      .dadosEstados()
      .subscribe((res: Array<Estados>) => {
        this.estados = res;
      });
  }

  retornaDadosDoEstadoCivil() {
    this.listarDadosPessoaisService
      .dadosEstadoCivil()
      .subscribe((res: Array<EstadoCivil>) => {
        this.estadosCivil = res;
      });
  }

  carregarIdEstado(estados: Estados) {
    this.retornaDadosDasCidades(estados);
  }

  retornaDadosDasCidades(estados: Estados) {
    this.listarDadosPessoaisService
      .dadosCidades()
      .subscribe((res: Array<Cidades>) => {
        res.map((cd: Cidades) => {
          if (cd.state_id == estados.state_id) {
            this.cidade.patchValue(cd);
            this.cidades.push(this.cidade.value);
          }
        });
      });
  }

  get estado() {
    return this.dadosPessoaisForm.get('estado') as FormGroup;
  }

  get cidade() {
    return this.dadosPessoaisForm.get('cidade') as FormGroup;
  }

  closeModal() {
    this.dialogRef.close();
  }

  carregarDadosModal() {
    this.dadosPessoais = this.dadosPessoaisForm.value;
    if (this.data != null) {
      this.dadosPessoais.id = this.data.id;
    }
    this.dialogRef.close(this.dadosPessoais);
  }

  compareOsValoresDoEstadoCivil(v1: EstadoCivil, v2: EstadoCivil) {
    return v1 && v2 ? v1.id === v2.id : v1 === v2;
  }

  compareOsValoresDoEstado(v1: Estados, v2: Estados) {
    return v1 && v2 ? v1.state_id === v2.state_id : v1 === v2;
  }

  compareOsValoresDoCidade(v1: Cidades, v2: Cidades) {
    return v1 && v2 ? v1.id === v2.id : v1 === v2;
  }
}

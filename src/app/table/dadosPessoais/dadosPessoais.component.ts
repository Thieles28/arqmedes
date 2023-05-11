import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cidades } from 'src/app/model/Cidades';
import { DadosPessoais } from 'src/app/model/DadosPessoais';
import { EstadoCivil } from 'src/app/model/EstadoCivil';
import { Estados } from 'src/app/model/Estados';
import { TableService } from '../table.service';

@Component({
  selector: 'app-dadosPessoais',
  templateUrl: './dadosPessoais.component.html',
  styleUrls: ['./dadosPessoais.component.css'],
})
export class DadosPessoaisComponent implements OnInit {
  declare dadosPessoaisForm: FormGroup;
  declare estados: Array<Estados>;
  declare estadosCivil: Array<EstadoCivil>;
  cidades: Array<Cidades> = new Array<Cidades>();
  dadosPessoais: DadosPessoais = new DadosPessoais();

  constructor(
    private tableService: TableService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DadosPessoaisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DadosPessoais
  ) {}

  ngOnInit() {
    console.log('Atualizar', this.data);
    this.retornaDadosDosEstados();
    this.retornaDadosDoEstadoCivil();
    this.criarDadosPessoaisForm(new DadosPessoais());
    this.atualizarDadosPessoaisForm(this.data);
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

  retornaDadosDosEstados() {
    this.tableService.dadosEstados().subscribe((res: Array<Estados>) => {
      this.estados = res;
    });
  }

  retornaDadosDoEstadoCivil() {
    this.tableService
      .dadosEstadoCivil()
      .subscribe((res: Array<EstadoCivil>) => {
        this.estadosCivil = res;
      });
  }

  carregarIdEstado(event: number) {
    this.retornaDadosDasCidades(event.toString());
  }

  retornaDadosDasCidades(state_id: string) {
    this.tableService.dadosCidades().subscribe((res: Array<Cidades>) => {
      res.map((cd: Cidades) => {
        if (cd.state_id == state_id) {
          this.cidade.patchValue(cd);
          this.cidades.push(this.cidade.value);
        }
      });
    });
  }

  get estado() {
    return this.dadosPessoaisForm.get('estado') as FormControl;
  }

  get cidade() {
    return this.dadosPessoaisForm.get('cidade') as FormControl;
  }

  closeModal() {
    this.dialogRef.close();
  }

  carregarDadosModal() {
    this.dadosPessoais = this.dadosPessoaisForm.value;
    this.dadosPessoais.id = this.data.id;
    this.dialogRef.close(this.dadosPessoais);
  }
}

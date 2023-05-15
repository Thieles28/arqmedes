import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogRef,
} from '@angular/material/dialog';
import { DadosPessoais } from 'src/app/model/DadosPessoais';

@Component({
  selector: 'app-visualizarDadosPessoais',
  templateUrl: './visualizarDadosPessoais.html',
  styleUrls: ['./visualizarDadosPessoais.css'],
})
export class VisualizarDadosPessoais implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<VisualizarDadosPessoais>,
    @Inject(MAT_DIALOG_DATA) public data: DadosPessoais
  ) {}

  ngOnInit() {}

  closeModal() {
    this.dialogRef.close();
  }
}

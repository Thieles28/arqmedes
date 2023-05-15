import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DadosPessoais } from 'src/app/model/DadosPessoais';

@Component({
  selector: 'app-removerDadosPessoais',
  templateUrl: './removerDadosPessoais.html',
  styleUrls: ['./removerDadosPessoais.css'],
})
export class RemoverDadosPessoais implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<RemoverDadosPessoais>,
    @Inject(MAT_DIALOG_DATA) public data: DadosPessoais
  ) {}

  ngOnInit() {}

  closeModal() {
    this.dialogRef.close();
  }
}

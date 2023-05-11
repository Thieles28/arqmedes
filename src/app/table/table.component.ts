import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DadosPessoais } from '../model/DadosPessoais';
import { DadosPessoaisComponent } from './dadosPessoais/dadosPessoais.component';
import { RemoverDadosPessoais } from './removerDadosPessoais/removerDadosPessoais';
import { TableService } from './table.service';
import { VisualizarDadosPessoais } from './visualizarDadosPessoais/visualizarDadosPessoais';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, AfterViewInit {
  declare dataSource: MatTableDataSource<DadosPessoais>;
  dadosPessoais = new DadosPessoais();
  @ViewChild(MatPaginator) declare paginator: MatPaginator;
  @ViewChild(MatSort) declare sort: MatSort;

  displayedColumns = ['nome', 'dataNascimento', 'cpf', 'cidade', 'acoes'];

  constructor(
    private tableService: TableService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.retornaDadosPessoais();
  }

  retornaDadosPessoais() {
    this.tableService.dadosPessoais().subscribe((res: Array<DadosPessoais>) => {
      this.dataSource = new MatTableDataSource(res);
      res.map((res: DadosPessoais) => {
        this.dadosPessoais = res;
      });
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  incluirDadosPessoais(result: FormGroup) {
    this.tableService
      .incluirDadosPessoais(result.value)
      .subscribe((res: DadosPessoais) => {
        if (res != null) {
          this.toastr.success('Salvo com sucesso!');
          this.retornaDadosPessoais();
        }
      });
  }

  visualizarDadosPessoais(result: FormGroup) {
    console.log('visualizarDadosPessoais: ', result.value);
    this.tableService
      .visualizarDadosPessoais(result.value)
      .subscribe((res: DadosPessoais) => {
        if (res != null) {
          this.retornaDadosPessoais();
        }
      });
  }

  atualizarDadosPessoais(result: DadosPessoais) {
    this.tableService
      .atualizarDadosPessoais(result)
      .subscribe((res: DadosPessoais) => {
        if (res != null) {
          this.retornaDadosPessoais();
        }
      });
  }

  removerDadosPessoais() {
    this.tableService
      .removerDadosPessoais(this.dadosPessoais)
      .subscribe((res: DadosPessoais) => {
        if (res != null) {
          this.retornaDadosPessoais();
          console.log('Dados pessoas deleta com sucesso:', res);
        }
      });
  }

  visualizarDadosDialogo(dadosPessoais: DadosPessoais) {
    if (this.dialog.openDialogs.length == 0) {
      const dialogRef = this.dialog.open(VisualizarDadosPessoais, {
        data: dadosPessoais,
        height: '440px',
        width: '800px',
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.visualizarDadosPessoais(result);
      });
    }
  }

  atulizarDadosDialogo(dadosPessoais: DadosPessoais) {
    if (this.dialog.openDialogs.length == 0) {
      const dialogRef = this.dialog.open(DadosPessoaisComponent, {
        data: dadosPessoais,
        height: '440px',
        width: '800px',
      });
      dialogRef.afterClosed().subscribe((result: DadosPessoais) => {
        console.log('atulizarDadosDialogo: ', result);
        this.atualizarDadosPessoais(result);
      });
    }
  }

  abrirDialogo() {
    if (this.dialog.openDialogs.length == 0) {
      const dialogRef = this.dialog.open(DadosPessoaisComponent, {
        height: '440px',
        width: '800px',
      });
      dialogRef.afterClosed().subscribe((result: FormGroup) => {
        this.incluirDadosPessoais(result);
      });
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    if (this.dialog.openDialogs.length == 0) {
      const dialogRef = this.dialog.open(RemoverDadosPessoais, {
        width: '400px',
        enterAnimationDuration,
        exitAnimationDuration,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result == true) {
          this.removerDadosPessoais();
        }
      });
    }
  }
}

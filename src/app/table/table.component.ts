import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { DadosPessoais } from '../model/DadosPessoais';
import { DadosPessoaisComponent } from './dadosPessoais/dadosPessoais.component';
import { RemoverDadosPessoais } from './removerDadosPessoais/removerDadosPessoais';
import { TableService } from './table.service';
import { VisualizarDadosPessoais } from './visualizarDadosPessoais/visualizarDadosPessoais';
import { debounceTime, fromEvent } from 'rxjs';

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
  @ViewChild('campoBusca') declare campoBusca: ElementRef<HTMLInputElement>;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 50, 100];
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
    this.filtro();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private filtro() {
    fromEvent(this.campoBusca.nativeElement, 'keyup')
      .pipe(debounceTime(1000))
      .subscribe((event: Event) => {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue;
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      });
  }

  incluirDadosPessoais(result: DadosPessoais) {
    this.tableService
      .incluirDadosPessoais(result)
      .subscribe((res: DadosPessoais) => {
        if (res != null) {
          this.toastr.success('Salvo com sucesso!', 'Sucesso', {
            progressBar: true,
          });
          this.retornaDadosPessoais();
        }
      });
  }

  visualizarDadosPessoais(result: DadosPessoais) {
    this.tableService
      .visualizarDadosPessoais(result)
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
          this.toastr.success('Atualizado com sucesso!', 'Sucesso', {
            progressBar: true,
          });
          this.retornaDadosPessoais();
        }
      });
  }

  removerDadosPessoais() {
    this.tableService
      .removerDadosPessoais(this.dadosPessoais)
      .subscribe((res: DadosPessoais) => {
        if (res != null) {
          this.toastr.success('Removido com sucesso!', 'Sucesso', {
            progressBar: true,
          });
          this.retornaDadosPessoais();
        }
      });
  }

  visualizarDadosDialogo(dadosPessoais: DadosPessoais) {
    if (this.dialog.openDialogs.length == 0) {
      const dialogRef = this.dialog.open(VisualizarDadosPessoais, {
        data: dadosPessoais,
        height: '510px',
        width: '800px',
      });
      dialogRef.afterClosed().subscribe((result: DadosPessoais) => {
        if (result != null) {
          this.visualizarDadosPessoais(result);
        }
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
        if (result != null) {
          this.atualizarDadosPessoais(result);
        }
      });
    }
  }

  abrirDialogo() {
    if (this.dialog.openDialogs.length == 0) {
      const dialogRef = this.dialog.open(DadosPessoaisComponent, {
        height: '440px',
        width: '800px',
      });
      dialogRef.afterClosed().subscribe((result: DadosPessoais) => {
        if (result != null) {
          this.incluirDadosPessoais(result);
        }
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

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
}

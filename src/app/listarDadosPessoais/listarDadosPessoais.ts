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
import { ToastrService } from 'ngx-toastr';
import { debounceTime, fromEvent } from 'rxjs';
import { DadosPessoais } from '../model/DadosPessoais';
import { IncluirDadosPessoais } from './IncluirDadosPessoais/IncluirDadosPessoais';
import { ListarDadosPessoaisService } from './listarDadosPessoais.service';
import { RemoverDadosPessoais } from './removerDadosPessoais/removerDadosPessoais';
import { VisualizarDadosPessoais } from './visualizarDadosPessoais/visualizarDadosPessoais';

@Component({
  selector: 'app-listarDadosPessoais',
  templateUrl: './listarDadosPessoais.html',
  styleUrls: ['./listarDadosPessoais.css'],
})
export class ListarDadosPessoais implements OnInit, AfterViewInit {
  declare dataSource: MatTableDataSource<DadosPessoais>;
  dadosPessoais = new DadosPessoais();
  @ViewChild(MatPaginator) declare paginator: MatPaginator;
  @ViewChild(MatSort) declare sort: MatSort;
  @ViewChild('campoBusca') declare campoBusca: ElementRef<HTMLInputElement>;
  pageSize = 5;
  pageIndex = 0;
  totalSize = 0;
  show: boolean = true;
  pageSizeOptions = [5, 10, 25, 50, 100];
  displayedColumns = ['nome', 'dataNascimento', 'cpf', 'cidade', 'acoes'];

  constructor(
    private listarDadosPessoaisService: ListarDadosPessoaisService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.retornaDadosPessoais();
  }

  retornaDadosPessoais() {
    this.listarDadosPessoaisService
      .dadosPessoais()
      .subscribe((res: Array<DadosPessoais>) => {
        this.dataSource = new MatTableDataSource(res);
        this.totalSize = res.length;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        res.map((res: DadosPessoais) => {
          this.dadosPessoais = res;
        });
      });
  }

  ngAfterViewInit() {
    this.filtro();
  }

  private filtro() {
    fromEvent(this.campoBusca.nativeElement, 'keyup')
      .pipe(debounceTime(1000))
      .subscribe((event: Event) => {
        const filterValue = (event.target as HTMLInputElement).value;
        console.log('filtro: ', filterValue);
        if (filterValue.length > 2 || filterValue.length < 3) {
          const semNumeros = filterValue.replace(/[0-9]/g, '');
          this.dataSource.filter = semNumeros;
          if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
          }
        }
      });
  }

  incluirDadosPessoais(result: DadosPessoais) {
    this.listarDadosPessoaisService
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
    this.listarDadosPessoaisService
      .visualizarDadosPessoais(result)
      .subscribe((res: DadosPessoais) => {
        if (res != null) {
          this.retornaDadosPessoais();
        }
      });
  }

  atualizarDadosPessoais(result: DadosPessoais) {
    this.listarDadosPessoaisService
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
    this.listarDadosPessoaisService
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
        height: '420px',
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
      const dialogRef = this.dialog.open(IncluirDadosPessoais, {
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
      const dialogRef = this.dialog.open(IncluirDadosPessoais, {
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

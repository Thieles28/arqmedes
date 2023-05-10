import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DadosPessoais } from '../model/DadosPessoais';
import { TableService } from './table.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, AfterViewInit {
  declare dataSource: MatTableDataSource<DadosPessoais>;
  @ViewChild(MatPaginator) declare paginator: MatPaginator;
  @ViewChild(MatSort) declare sort: MatSort;

  displayedColumns = ['nome', 'dataNascimento', 'cpf', 'cidade', 'acoes'];

  constructor(private tableService: TableService) {}

  ngOnInit() {
    this.retornaDadosPessoais();
  }

  retornaDadosPessoais() {
    this.tableService.dadosPessoais().subscribe((res: Array<DadosPessoais>) => {
      this.dataSource = new MatTableDataSource(res);
      console.log('Resposta: ', this.dataSource);
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
}

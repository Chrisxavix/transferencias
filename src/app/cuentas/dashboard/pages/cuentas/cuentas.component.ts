import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CurrencyPipe } from '@angular/common';
import { CuentaService } from '../../services/cuenta.service';
import { CTL } from '../../interfaces/respuesta-cuentas';

@Component({
  selector: 'app-cuentas',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CurrencyPipe,
  ],
  templateUrl: './cuentas.component.html',
  styleUrl: './cuentas.component.css'
})
export class CuentasComponent implements OnInit {

  displayedColumns: string[] = [
    'numeroCuenta',
    'titular',
    'tipoCuenta',
    'saldo',
    'estado'
  ];

  page = 0;
  size = 10;
  totalElements = 0;

  private cuentaService = inject(CuentaService);
  private paginatorIntl = inject(MatPaginatorIntl);
  dataSource = new MatTableDataSource<CTL>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.paginator.page.subscribe(event => {
      this.obtenerCuentas(event.pageIndex, event.pageSize);
    });
  }

  ngOnInit(): void {
    // Nombres para el paginador
    this.paginatorIntl.itemsPerPageLabel = 'Registros por página:';
    this.paginatorIntl.nextPageLabel = 'Siguiente';
    this.paginatorIntl.previousPageLabel = 'Anterior';
    this.paginatorIntl.firstPageLabel = 'Primera página';
    this.paginatorIntl.lastPageLabel = 'Última página';
    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property === 'saldo') {
        return Number(item.saldo);
      }
      return item[property as keyof CTL] as string | number;
    };
    this.obtenerCuentas(0, 10);
  }

  obtenerCuentas(page: number, size: number): void {
    this.cuentaService.obtenerCuentas(page, size).subscribe({
      next: (respuesta) => {
        console.log('Respuesta API:', respuesta);
        this.dataSource.data = respuesta.ctl;
        // Actualizamos el total que conoce el paginator
        this.paginator.length = respuesta.total;
      },
      error: (error) => {
        console.error('Error al obtener cuentas:', error);
      }
    });
  }
}

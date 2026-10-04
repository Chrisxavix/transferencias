import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { transferencia } from '../../interfaces/transferencia';
import { leadsMock } from '../../mock/transferencias';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CurrencyPipe } from '@angular/common';

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
export class CuentasComponent {

  displayedColumns: string[] = [
    'numeroCuenta',
    'titular',
    'tipoCuenta',
    'saldoActual',
    'estado'
  ];

  dataSource = new MatTableDataSource<transferencia>(leadsMock);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

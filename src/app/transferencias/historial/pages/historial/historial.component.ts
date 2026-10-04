import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { HistorialService } from '../../services/historial.service';
import { CTL } from '../../interfaces/historialRespuesta';

@Component({
  selector: 'app-historial',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent implements OnInit {

  displayedColumns: string[] = [
    'numeroMovimiento',
    'monto',
    'numeroCuentaOrigen',
    'numeroCuentaDestino',
    'observacion',
    'estado',
    'fechaCreacion',
    // 'motivoEstado'
  ];

  page = 0;
  size = 10;
  totalElements = 0;

  private historialService = inject(HistorialService);
  private paginatorIntl = inject(MatPaginatorIntl);

  dataSource = new MatTableDataSource<CTL>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.paginatorIntl.itemsPerPageLabel = 'Registros por página:';
    this.paginatorIntl.nextPageLabel = 'Siguiente';
    this.paginatorIntl.previousPageLabel = 'Anterior';
    this.paginatorIntl.firstPageLabel = 'Primera página';
    this.paginatorIntl.lastPageLabel = 'Última página';
    this.obtenerHistorial(this.page, this.size);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.paginator.page.subscribe(event => {
      this.page = event.pageIndex;
      this.size = event.pageSize;
      this.obtenerHistorial(this.page, this.size);
    });
  }

  obtenerHistorial(page: number, size: number): void {
    this.historialService.obtenerHistorial(page, size).subscribe({
      next: (respuesta) => {
        console.log('Respuesta API:', respuesta);
        this.dataSource.data = respuesta.ctl;
        this.totalElements = respuesta.total;
        console.log('Total registros:', this.totalElements);
      },
      error: (error) => {
        console.error('Error al obtener historial:', error);
      }
    });
  }
}

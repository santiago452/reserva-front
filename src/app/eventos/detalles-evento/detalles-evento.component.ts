import { Component, Inject, inject, ViewChild } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { ActivatedRoute, ParamMap, RouterLink, RouterOutlet } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EventoService } from '../../services/eventos.service';
import { Eventos } from '../../models/Evento';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-detalles-evento',
  imports: [AngularMaterialModule],
  templateUrl: './detalles-evento.component.html',
  styleUrl: './detalles-evento.component.css'
})
export class DetallesEventoComponent {
  displayedColumns: string[] = ['id','name', 'description','date','location'];
    dataSource!:MatTableDataSource<any>;
    @ViewChild(MatPaginator)paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort 
  
    listEventos: any = [];
    servicioEventos = inject(EventoService);
    constructor(
      public dialog: MatDialog,
      private route: ActivatedRoute,
      @Inject(MAT_DIALOG_DATA) public idEvento: any,
    ) {
    }
  
    id: any;
    ngOnInit() {
        this.listarEventosPorId(Number(this.idEvento.id));
        this.dataSource = new MatTableDataSource<Eventos>(this.listEventos);
    }
  
    private listarEventosPorId(id: number) {
      this.servicioEventos.listarPorId(id).subscribe(data => {
        this.listEventos = data;
        this.dataSource = new MatTableDataSource<Eventos>(this.listEventos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
}

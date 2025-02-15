import { Component, inject, ViewChild } from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EventoService } from '../../services/eventos.service';
import { Eventos } from '../../models/Evento';
import { MatDialog } from '@angular/material/dialog';
import { ModificarEventoComponent } from './modificar-evento/modificar-evento.component';
import { DetallesEventoComponent } from '../detalles-evento/detalles-evento.component';
import Swal from 'sweetalert2';
import { CrearEventoComponent } from './crear-evento/crear-evento.component';
import { ReservaComponent } from '../reserva/reserva.component';
import { InicioSesionComponent } from '../../inicio-sesion/inicio-sesion.component';
@Component({
  selector: 'app-listar-eventos',
  imports: [AngularMaterialModule, RouterOutlet],
  templateUrl: './listar-eventos.component.html',
  styleUrl: './listar-eventos.component.css'
})
export class ListarEventosComponent {
  displayedColumns: string[] = ['id','name', 'description','date','location', 'acciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator)paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort 

  listEventos: any = [];
  servicioEventos = inject(EventoService);
  constructor(
    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.listarEventos();
    this.listEventos = [{
      id: 1,
      name: 'Evento 1',
      description: 'Evento 1',
      date: '2021-10-10',
      location: 'Lugar 1'
    },
    {
      id: 2,
      name: 'Evento 2',
      description: 'Evento 2',
      date: '2021-10-10',
      location: 'Lugar 2'
    },
    {
      id: 3,
      name: 'Evento 3',
      description: 'Evento 3',
      date: '2021-10-10',
      location: 'Lugar 3'
    }];
    this.dataSource = new MatTableDataSource<Eventos>(this.listEventos);
  }

  private listarEventos() {
    this.servicioEventos.listarTodos().subscribe(data => {
      this.listEventos = data;
      this.dataSource = new MatTableDataSource<Eventos>(this.listEventos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  agregarEvento() {
    const dialog = this.dialog.open(CrearEventoComponent, { 
      maxWidth: '1000px', height: '500px', data: {},
    });
  }

  agregarReserva() {
    const dialog = this.dialog.open(ReservaComponent, { 
      maxWidth: '1000px', height: '500px', data: {},
    });
  }

  actualizarEvento(id: number) {
    const dialog = this.dialog.open(ModificarEventoComponent, { 
      width: '800px', height: '500px', data: {},
      disableClose: true
    });
  }

  visualizarEvento(id: number) {
    console.log(id);
    const dialog = this.dialog.open(DetallesEventoComponent, {
      width: '800px', height: '500px', data: {
        id: id
      },
      disableClose: true
    });
  }
  eliminarEvento(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mx-5'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result: any) => {
      if (result.isConfirmed) {
        if (sessionStorage.getItem('token')) {
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'El usuario ha sido eliminado.',
            'success'
          ).then(() => {
            // Aquí puedes agregar código que se ejecute después de que el usuario cierra la alerta de éxito
            this.servicioEventos.eliminar(id).subscribe(() => {
              this.ngOnInit();
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            });
          });
        } else {
          this.dialog.open(InicioSesionComponent, {
            width: '800px', height: '500px'
          });
          
        }
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado!',
          '',
          'error'
        );
      }
    });
  }
}

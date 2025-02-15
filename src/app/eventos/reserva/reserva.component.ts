import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventoService } from '../../services/eventos.service';
import { MatDialog } from '@angular/material/dialog';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';

@Component({
  selector: 'app-reserva',
  imports: [AngularMaterialModule],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})
export class ReservaComponent {
  public formReserva!: FormGroup;
  servicioEventos = inject(EventoService);
  listEventos: any = [];
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.formReserva = this.fb.group({
      name: [''],
      email: [''],
      seats: [''],
      evento: ['']
    });
  }

  listarEventos() {
    this.servicioEventos.listarTodos().subscribe(data => {
      this.listEventos = data;
    });
  }

  crearReserva() {

  }

  volver() {
    this.dialog.closeAll();
  }
}

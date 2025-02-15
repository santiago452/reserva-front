import { Component, inject } from '@angular/core';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EventoService } from '../../../services/eventos.service';
import { AutenticacionService } from '../../../services/auth.service';
import { InicioSesionComponent } from '../../../inicio-sesion/inicio-sesion.component';

@Component({
  selector: 'app-crear-evento',
  imports: [AngularMaterialModule],
  templateUrl: './crear-evento.component.html',
  styleUrl: './crear-evento.component.css'
})
export class CrearEventoComponent {
  public formEvento!: FormGroup;

  servicioEvento = inject(EventoService);
  servicioAuth = inject(AutenticacionService);
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.formEvento = this.fb.group({
      name: [''],
      description: [''],
      date: [''],
      location: ['']
    });
  }

  ngOnInit() {
  }

  agregarEvento() {
    if (sessionStorage.getItem('token')) {
      this.servicioEvento.registrar(this.formEvento.value).subscribe(data => {
        console.log('Evento creado', data);
        this.dialog.closeAll();
      }, error => {
        console.log('Error al crear evento', error);
      });
    } else {
      this.dialog.open(InicioSesionComponent);
    }
  }

  volver() {
    this.dialog.closeAll();
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { AutenticacionService } from '../services/auth.service';
import { UsuarioService } from '../services/usuarios.services';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
@Component({
  selector: 'app-inicio-sesion',
  imports: [AngularMaterialModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {
  public formSesion!: FormGroup;
  servicioAuth = inject(AutenticacionService);
  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formSesion = this.fb.group({
      id: 0,
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  } 
  iniciarSesion() {
    if (this.formSesion.valid) {
      this.servicioAuth.login2(this.formSesion.value.correo, this.formSesion.value.contrasena).subscribe((data: any) => {
        this.router.navigate(['/eventos']);
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Usuario o contraseña incorrectos',
        });
      });
    }else{
      this.formSesion.markAllAsTouched();
    }
  }
}

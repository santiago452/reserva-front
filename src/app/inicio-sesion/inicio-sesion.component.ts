import { Component, OnInit } from '@angular/core';
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
  constructor(
    private fb: FormBuilder,
    private authService: AutenticacionService,
    private dialogRef: MatDialogRef<InicioSesionComponent>,
    private router: Router,
    private servicioUsuario: UsuarioService,
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
      this.servicioUsuario.listarTodos().subscribe( (data:any) => {
        // Parseamos las contraseñas de los usuarios
        data.forEach((usuario:any) => {
          let contrasena = usuario.password.toString();
          let contrasenaDesencriptada = CryptoJS.AES.decrypt(contrasena, 'secret key 123');
          let contrasenaDesencriptadaString = contrasenaDesencriptada.toString(CryptoJS.enc.Utf8);
          usuario.password = contrasenaDesencriptadaString;
        });
        console.log(data);
        // Buscamos el usuario que se quiere loguear
        let usuario = data.find((usuario:any) => { return usuario.correo == this.formSesion.get('correo')?.value });
        // Si el usuario existe
        if (usuario) {
          // Tomamos la contraseña del usuario que nos trajo la base de datos
          let contrasena = usuario.password.toString();
          // Desencriptamos la contraseña
          let contrasenaDesencriptada = CryptoJS.AES.decrypt(contrasena, 'secret key 123');
          // Convertimos la contraseña desencriptada a string
          let contrasenaDesencriptadaString = contrasenaDesencriptada.toString(CryptoJS.enc.Utf8);
          // Si la contraseña del usuario que se quiere loguear es igual a la contraseña del usuario que nos trajo la base de datos
          if (contrasenaDesencriptadaString == this.formSesion.get('contrasena')?.value) {
            // Guardamos el usuario en el localStorage
            sessionStorage.setItem('id', usuario.id.toString());
            // Cerramos el modal
            this.dialogRef.close();
          }else{
            alert('Contraseña incorrecta');
          }
        }else{
          alert('El usuario no existe');
        }
      });
    }else{
      this.formSesion.markAllAsTouched();
    }
  }
}

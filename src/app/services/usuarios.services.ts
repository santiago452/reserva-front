// Creamos el servicio para enviar peticiones al servidor
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';
@Injectable({
    providedIn: 'root'
})
export class UsuarioService { 
    
    private path: string;
    private usuariosSubject = new BehaviorSubject<Usuario[]>([]);

    constructor(private http: HttpClient, private sharedService: SharedService) {
        this.path = this.sharedService.APIUrl + '/Usuarios';
    }
    public listarTodos(){
        return this.http.get<Usuario>(this.path+'/Obtener');
    }

    public listarPorId(id: number){
    return this.http.get<Usuario>(this.path+'/ObtenerId/'+id);
    }

    public registrar(usuario: Usuario){
    return this.http.post<void>(this.path+'/Guardar',usuario);
    }

    public actualizar(usuario: Usuario){
    return this.http.put<void>(this.path+'/Modificar/'+ usuario.id, usuario);
    }

    public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
    }
}

// Creamos el servicio para enviar peticiones al servidor
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SharedService } from '../shared.service';
import { Eventos } from '../models/Evento';
@Injectable({
    providedIn: 'root'
})
export class EventoService { 
    
    private path: string;

    constructor(private http:HttpClient, private sharedService:SharedService) { 
        this.path = this.sharedService.APIUrl + '/Eventos';
    }

    public listarTodos(){
        return this.http.get<Eventos>(this.path+'/events');
    }


    public listarPorId(id: number){
        return this.http.get<Eventos>(this.path+'/ObtenerId/'+id);
    }

    public registrar(evento: Eventos){
    return this.http.post<void>(this.path+'/Guardar',evento);
    }

    public actualizar(evento: Eventos){
    return this.http.put<void>(this.path+'/Modificar/'+ evento.id, evento);
    }

    public eliminar(id: number){
    return this.http.delete<void>(this.path+'/Eliminar/'+id);
    }
}

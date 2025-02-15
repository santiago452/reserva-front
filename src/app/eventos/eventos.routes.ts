import { Routes } from '@angular/router';
import { ListarEventosComponent } from './listar-eventos/listar-eventos.component';
import { InicioSesionComponent } from '../inicio-sesion/inicio-sesion.component';

export const routes: Routes = [
    {
        path: '',
        component: InicioSesionComponent,
    },
    {
        path: 'eventos',
        component: ListarEventosComponent,
    }
];

export default routes;

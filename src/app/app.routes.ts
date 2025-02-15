import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./eventos/eventos.routes').then(m => m.default)
    }
];

import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from "./login/register.component";

const appRoutes: Routes = [
    {
        //si ruta es vacia entonces por esta definicion se carga este componente
        path: '',
        component: PagesComponent,
        children: [
            { 
                path:'dashboard',
                component: DashboardComponent
            },
            { 
                path:'progress',
                component: ProgressComponent
            },
            { 
                path:'graficas1',
                component: Graficas1Component
            },                        
            {
                path:'',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
        ]
    },
    { 
        path:'login',
        component: LoginComponent
    },
    { 
        path:'register',
        component: RegisterComponent
    },
    //si ruta no concuerda con ninguna de las anteriores se carga el siguiente componente
    {
        path: '**',
        component: NopagefoundComponent
    }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true})
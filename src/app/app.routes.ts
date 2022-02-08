import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from "./login/register.component";

const appRoutes: Routes = [
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
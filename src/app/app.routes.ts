import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from "./login/register.component";
import { PagesComponent } from "./pages/pages.component";
import { LoginGuardGuard } from './services/guards/login-guard.guard';

const appRoutes: Routes = [
    { 
        path:'login',
        component: LoginComponent
    },
    { 
        path:'register',
        component: RegisterComponent
    },
    {
        //si ruta es vacia entonces por esta definicion se carga este componente
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        loadChildren: ()=>import( './pages/pages.module').then(m => m.PagesModule)
    },
    //si ruta no concuerda con ninguna de las anteriores se carga el siguiente componente
    {
        path: '**',
        component: NopagefoundComponent
    }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true})
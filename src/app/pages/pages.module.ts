import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgChartsModule } from 'ng2-charts';

import { SharedModule } from "../shared/shared.module";
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from "./pages.routes";
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

@NgModule({
    declarations: [
        DashboardComponent,
        Graficas1Component,
        PagesComponent,
        ProgressComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent
    ],
    exports: [
        DashboardComponent,
        Graficas1Component,
        ProgressComponent
    ],
    imports: [
        FormsModule,
        SharedModule,
        PAGES_ROUTES,
        NgChartsModule,
    ]
})
export class PagesModule { }
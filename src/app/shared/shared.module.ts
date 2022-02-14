import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    declarations: [
        BreadcrumsComponent,
        HeaderComponent,
        NopagefoundComponent,
        SidebarComponent,
    ],
    exports: [
        BreadcrumsComponent,
        HeaderComponent,
        NopagefoundComponent,
        SidebarComponent,
    ]
})
export class SharedModule { }
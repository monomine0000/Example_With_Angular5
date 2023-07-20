import {NgModule} from '@angular/core';
import {AdminRoutingModule} from './admin-routing.module';
import {AuthService} from '../services/auth.service';
import {AdminService} from '../services/admin.service';
import {PageEditComponent} from './page-edit/admin-page-edit.component';
import {PageListComponent} from './page-list/admin-page-list.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';

@NgModule({
    declarations: [
        AdminComponent,
        PageListComponent,
        PageEditComponent
    ],
    imports: [
        AdminRoutingModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
    ],
    providers: [
        AuthService,
        AdminService
    ],
    bootstrap: [AdminComponent],
})
export class AdminModule {
}

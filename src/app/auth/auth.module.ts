import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {RegisterComponent} from './register/register.component';
import {AdminService} from '../services/admin.service';
import {AuthService} from '../services/auth.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthRoutingModule} from './auth-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        AuthRoutingModule
    ],
    declarations: [
        LoginComponent,
        LogoutComponent,
        RegisterComponent,
    ],
    providers: [
        AuthService,
        AdminService
    ],
})
export class AuthModule {
}

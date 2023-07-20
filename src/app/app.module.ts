import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {PageComponent} from './page/page.component';
import {FormsModule} from '@angular/forms';
import {MainService} from './services/main.service';
import {ErrorComponent} from './error/error.component';
import {AdminService} from './services/admin.service';
import {AuthGuardService} from './services/auth-guard.service';
import {AuthInterceptor} from './interceptors/auth-interceptor';
import { MenuComponent } from './menu/menu.component';

@NgModule({
    declarations: [
        AppComponent,
        PageComponent,
        ErrorComponent,
        MenuComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
    ],
    providers: [
        AuthService,
        MainService,
        AdminService,
        AuthGuardService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

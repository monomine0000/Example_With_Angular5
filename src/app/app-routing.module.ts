import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageComponent} from './page/page.component';
import {ErrorComponent} from './error/error.component';
import {AuthGuardService} from './services/auth-guard.service';

const routes: Routes = [
    {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
    {path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthGuardService]},
    {path: '', component: PageComponent},
    {path: ':slug', component: PageComponent},
    {path: '**', component: ErrorComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

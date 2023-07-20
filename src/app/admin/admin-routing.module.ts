import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageListComponent} from './page-list/admin-page-list.component';
import {PageEditComponent} from './page-edit/admin-page-edit.component';

const routes: Routes = [
    {path: '', component: PageListComponent},
    {path: 'page/:pageId', component: PageEditComponent},
    {path: 'page', component: PageEditComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}

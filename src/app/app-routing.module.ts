import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginActivate} from './login/login.activate';
import {GalleriesComponent} from './galleries/galleries.component';
import {ArtifactsComponent} from './artifacts/artifacts.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [LoginActivate]},
  {path: 'galleries', component: GalleriesComponent, canActivate: [LoginActivate]},
  {path: 'galleries/:id', component: ArtifactsComponent, canActivate: [LoginActivate]},
  {path: '**', component: PageNotFoundComponent, canActivate: [LoginActivate]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

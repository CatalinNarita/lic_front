import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './header/header.component';
import {FormsModule} from '@angular/forms';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginService} from './login/login.service';
import {HttpClientModule} from '@angular/common/http';
import {LoginActivate} from './login/login.activate';
import {GalleriesComponent} from './galleries/galleries.component';
import {GalleriesService} from './galleries/galleries.service';
import {BearerTokenService} from './bearer-token.service';
import {ArtifactsComponent} from './artifacts/artifacts.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {MatListModule} from '@angular/material';
import {NgxSpinnerModule} from 'ngx-spinner';
import {BsDropdownModule, ModalModule} from 'ngx-bootstrap';
import {SelectDropDownModule} from 'ngx-select-dropdown';
import {ArtifactsService} from './artifacts/artifact.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    GalleriesComponent,
    ArtifactsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatListModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
    SelectDropDownModule
  ],
  providers: [
    LoginService,
    LoginActivate,
    GalleriesService,
    BearerTokenService,
    ArtifactsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

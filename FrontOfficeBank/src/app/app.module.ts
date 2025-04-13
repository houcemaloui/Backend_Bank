import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterLink, RouterModule } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatdashComponent } from './statdash/statdash.component';
import { ComptebancaireComponent } from './comptebancaire/comptebancaire.component';
import { UserComponent } from './user/user.component';
import { CarteBancaireComponent } from './carte-bancaire/carte-bancaire.component';
import { CompteBUserComponent } from './compte-buser/compte-buser.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    StatdashComponent,
    ComptebancaireComponent,
    UserComponent,
    CarteBancaireComponent,
    CompteBUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterLink,
    RouterModule,
    ReactiveFormsModule
],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

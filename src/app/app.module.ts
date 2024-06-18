import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { interceptorProjetoInterceptor } from './interceptor/interceptor-projeto.interceptor';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { guardiaoGuard } from './guard/guard/guardiao.guard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CategoriaProdutoComponent } from './components/categoria-produto/categoria-produto.component';

export const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: AppComponent},
  {path: 'home', component: HomeComponent, canActivate:[guardiaoGuard], data: {role:['ROLE_ADMIN', 'ROLE_USER', 'ROLE_FUNCIONARIO']}},
  {path: 'categoria-produto', component: CategoriaProdutoComponent, canActivate:[guardiaoGuard], data: {role:['ROLE_ADMIN', 'ROLE_USER', 'ROLE_FUNCIONARIO']}},
]

export const routes = RouterModule.forRoot(appRoutes);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    CategoriaProdutoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    routes
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: interceptorProjetoInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

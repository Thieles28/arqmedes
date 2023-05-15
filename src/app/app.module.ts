import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MaterialModule } from 'src/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DadosPessoaisComponent } from './table/dadosPessoais/dadosPessoais.component';
import { TableComponent } from './table/table.component';
import { VisualizarDadosPessoais } from './table/visualizarDadosPessoais/visualizarDadosPessoais';
import { RemoverDadosPessoais } from './table/removerDadosPessoais/removerDadosPessoais';
import { ToastrModule } from 'ngx-toastr';
import { Login } from './login/login';
import { Registrar } from './registrar/registrar';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavigationComponent,
    TableComponent,
    DadosPessoaisComponent,
    VisualizarDadosPessoais,
    RemoverDadosPessoais,
    Login,
    Registrar,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from 'src/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Dashboard } from './dashboard/dashboard';
import { IncluirDadosPessoais } from './listarDadosPessoais/IncluirDadosPessoais/IncluirDadosPessoais';
import { ListarDadosPessoais } from './listarDadosPessoais/listarDadosPessoais';
import { RemoverDadosPessoais } from './listarDadosPessoais/removerDadosPessoais/removerDadosPessoais';
import { VisualizarDadosPessoais } from './listarDadosPessoais/visualizarDadosPessoais/visualizarDadosPessoais';
import { Login } from './login/login';
import { Navigation } from './navigation/navigation';
import { Registrar } from './registrar/registrar';

@NgModule({
  declarations: [
    AppComponent,
    Dashboard,
    Navigation,
    ListarDadosPessoais,
    IncluirDadosPessoais,
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

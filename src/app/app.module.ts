import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraSuperiorComponent } from './components/barra-superior/barra-superior.component';
import { ContenedorPrincipalComponent } from './components/contenedor-principal/contenedor-principal.component';
import { ContenedorOrdenesDisponiblesComponent } from './components/contenedor-ordenes-disponibles/contenedor-ordenes-disponibles.component';
import { ContenedorOrdenesTomadasComponent } from './components/contenedor-ordenes-tomadas/contenedor-ordenes-tomadas.component';
import { ContenedorOrdenesEntregadasComponent } from './components/contenedor-ordenes-entregadas/contenedor-ordenes-entregadas.component';
import { RegistroComponent } from './components/registro/registro.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { PerfilMotoristaComponent } from './components/perfil-motorista/perfil-motorista.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    BarraSuperiorComponent,
    ContenedorPrincipalComponent,
    ContenedorOrdenesDisponiblesComponent,
    ContenedorOrdenesTomadasComponent,
    ContenedorOrdenesEntregadasComponent,
    RegistroComponent,
    InicioSesionComponent,
    LandingPageComponent,
    PerfilMotoristaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

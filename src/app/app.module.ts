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
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

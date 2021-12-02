import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ContenedorPrincipalComponent } from './components/contenedor-principal/contenedor-principal.component';
import { ContenedorOrdenesDisponiblesComponent } from './components/contenedor-ordenes-disponibles/contenedor-ordenes-disponibles.component';
import { ContenedorOrdenesEntregadasComponent } from './components/contenedor-ordenes-entregadas/contenedor-ordenes-entregadas.component';
import { ContenedorOrdenesTomadasComponent } from './components/contenedor-ordenes-tomadas/contenedor-ordenes-tomadas.component';
import { PerfilMotoristaComponent } from './components/perfil-motorista/perfil-motorista.component';

const routes: Routes = [
  {path:'inicio-sesion', component: InicioSesionComponent},
  {path: 'registro', component:RegistroComponent},
  {path: '', component:LandingPageComponent},
  {path: 'inicio', component:ContenedorPrincipalComponent},
  {path: 'ordenes-disponibles', component:ContenedorOrdenesDisponiblesComponent},
  {path: 'ordenes-entregadas', component:ContenedorOrdenesEntregadasComponent},
  {path: 'ordenes-tomadas', component:ContenedorOrdenesTomadasComponent},
  {path: 'perfil', component:PerfilMotoristaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [InicioSesionComponent, RegistroComponent,LandingPageComponent,ContenedorOrdenesDisponiblesComponent]
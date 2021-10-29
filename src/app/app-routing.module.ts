import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ContenedorPrincipalComponent } from './components/contenedor-principal/contenedor-principal.component';

const routes: Routes = [
  {path:'inicioSesion', component: InicioSesionComponent},
  {path: 'registro', component:RegistroComponent},
  {path: '', component:LandingPageComponent},
  {path: 'inicio', component:ContenedorPrincipalComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [InicioSesionComponent, RegistroComponent,LandingPageComponent]
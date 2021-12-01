import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MotoristasService } from 'src/app/services/motoristas.service';
import { CookieService } from 'ngx-cookie-service';
declare const Swal: any;

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {


  formularioLogin = new FormGroup({
    Correo:new FormControl('', [Validators.required]),
    Contraseña:new FormControl(''),
  });

  constructor(private motoristasservice:MotoristasService, private cookieService: CookieService) { }

  ngOnInit(): void {
  }

    
  iniciarSesion(){
    console.log(this.formularioLogin.value);
    this.motoristasservice.loginMotorista(this.formularioLogin.value.Correo).subscribe(
      (res:any)=>{
        console.log(res);
        if(res.length== 0){
          this.noExiste();
        }
        else{
          if(res[0].Contraseña == this.formularioLogin.value.Contraseña){
            if(res[0].Aprobado==true){
              this.cookieService.set('Motorista', res[0]._id, { expires: 10});
              window.location.href = '/inicio';
            }
            else{
              this.NoAprobado();
            }
          }
          else{
            this.incorrecto();
          } 

        }
      }
    );
  }

    
  incorrecto(){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: `Usuario y contraseña no coinciden.`,
      showConfirmButton: false,
      timer: 2500,
    });
  }
  
    
  noExiste(){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: `El Correo no está registrado`,
      showConfirmButton: false,
      timer: 2500,
    });
  }
    
  NoAprobado(){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: `El Motorista aún no ha sido aprobado`,
      showConfirmButton: false,
      timer: 2500,
    });
  }
}

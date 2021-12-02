import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MotoristasService } from 'src/app/services/motoristas.service';
declare const Swal: any;

@Component({
  selector: 'app-perfil-motorista',
  templateUrl: './perfil-motorista.component.html',
  styleUrls: ['./perfil-motorista.component.css']
})
export class PerfilMotoristaComponent implements OnInit {

  constructor(private cookieService:CookieService, private motoristaService:MotoristasService) { }

  faArrowLeft=faArrowLeft;
  MotristaC= this.cookieService.get('Motorista');
  Motorista:any= {};
  formDeValidacion = {};
  btnEditar = true;

  ngOnInit(): void {
    this.cargarMotorista();
    setTimeout( () => this.verificarCambios(),3000) ;
  }

  
  formularioMotorista = new FormGroup({
    NombreMotorista:new FormControl('', [Validators.required, Validators.maxLength(20)]),
    ImagenMotorista:new FormControl(''),
    Correo :new FormControl('', [Validators.required, Validators.email ]),
    Telefono:new FormControl('', [Validators.required]),
    Placa:new FormControl('', [Validators.required])
  });

  
  cargarMotorista(){
    this.motoristaService.obtenerUnMotoritas(this.MotristaC).subscribe(
      (res:any)=>{
        console.log(res);
        console.log(this.MotristaC);
        this.Motorista=res[0];
        this.cargarDatos();
      }
    );
  }

  
  cargarDatos(){
    this.formDeValidacion = {
      NombreMotorista: this.Motorista.Nombre,
      ImagenMotorista: this.Motorista.ImagenMotorista,
      Correo: this.Motorista.Correo,
      Telefono: this.Motorista.Telefono,
      Placa: this.Motorista.Placa,
    }

    this.formularioMotorista.setValue({
      NombreMotorista: this.Motorista.Nombre,
      ImagenMotorista: '',
      Correo: this.Motorista.Correo,
      Telefono: this.Motorista.Telefono,
      Placa: this.Motorista.Placa,
    });
  }

  
  verificarCambios(){
    this.formularioMotorista.valueChanges.subscribe(x => {
      this.btnEditar = false;
    })
  }

  correcto(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `Perfil Editado`,
      showConfirmButton: false,
      timer: 2500,
    });
  }

  sinCambios(){
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: `Sin datos modificados`,
      showConfirmButton: false,
      timer: 2500,
    });
  }

  cerrarSesion(){
    this.cookieService.delete('Motorista');
    window.location.href = '/inicio-sesion';
  }

  
  editarMotorista(){
      
    const NombreImagen = this.formularioMotorista.value.ImagenMotorista.split("\\");
    this.formularioMotorista.value.ImagenMotorista = NombreImagen[NombreImagen.length - 1];
    if(this.formularioMotorista.value.ImagenMotorista == ''){
      this.formularioMotorista.value.ImagenMotorista = this.Motorista.ImagenMotorista;
    }
    if(JSON.stringify(this.formDeValidacion) == JSON.stringify(this.formularioMotorista.value)){
      console.log("sin Cambios")
      this.sinCambios();
    }
    else {
      console.log("con Cambios")
      this.motoristaService.editarMotoristas(this.MotristaC,this.formularioMotorista.value).subscribe(
        res=>{
          console.log(res);
          this.correcto();
          this.cargarMotorista();
        }
      );
    }
  }
}

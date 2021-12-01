import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MotoristasService } from 'src/app/services/motoristas.service';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
declare const L: any;
declare const Swal: any;

@Component({
  selector: 'app-contenedor-ordenes-tomadas',
  templateUrl: './contenedor-ordenes-tomadas.component.html',
  styleUrls: ['./contenedor-ordenes-tomadas.component.css']
})

export class ContenedorOrdenesTomadasComponent implements OnInit {
  faArrowLeft=faArrowLeft;
  faCircle=faCircle;
  faTrashAlt=faTrashAlt;
  faEdit=faEdit;
  faUserPlus=faUserPlus;
  zoom:any = 10;
  mymap:any="";
  marker:any ="";
  lat:any;
  lon:any;
  Motorista=this.cookieService.get('Motorista');
  constructor(private modalService:NgbModal,  private ordenesService: OrdenesService, private motoristasService:MotoristasService, private cookieService: CookieService) { }
  ordenes:any;
  OrdenPendiente:any = [];
  subtotal:any=0;
  envio:any=0;
  total:any=0;
  estado:any="Pendiente";
  
  
  ngOnInit(): void {
    this.cargarOrdenes();
  }
  
  
  
  verDetallesOrden(modal:any, idOrden:any){
    this.ordenesService.obtenerOrdenId(idOrden).subscribe(
      res=>{
        this.OrdenPendiente = res;
        console.log(this.OrdenPendiente[0]);
        this.lat = this.OrdenPendiente[0].usuario.Ubicacion.lat; 
        this.lon = this.OrdenPendiente[0].usuario.Ubicacion.lon;
        this.estado = this.OrdenPendiente[0].estado;
        this.totalOrden();

        this.modalService.open(
          modal,
          {
            size:'xs',
            centered:true
          }
        );
        this.verMapa();
        this.trazarRuta(this.OrdenPendiente[0].productos[0]._id.Comercio[0].Ubicacion.lat, this.OrdenPendiente[0].productos[0]._id.Comercio[0].Ubicacion.lon)
      },
      error=>{
        console.log(error);
      }
    )

  }

  cargarOrdenes(){
    this.ordenesService.obtenerOrdenesMotorista(this.Motorista).subscribe(
      res=>{
        console.log(res);
        this.ordenes = res;
      },
      error=>{
        console.log(error);
      }
    );
  }

  totalOrden(){
    this.subtotal=0;
    let productos = this.OrdenPendiente[0].productos;
    productos.forEach((producto:any) => {
      
      console.log(producto);
      this.envio = producto._id.Comercio[0].CostoEnvio;
      this.subtotal += producto.Cantidad * producto._id.Precio;
    });
    this.total = this.subtotal + this.envio
    console.log(this.envio)
    console.log(this.subtotal)
    console.log(this.total)
  }

  verMapa(){

        this.mymap = L.map('mapa').setView([this.lat, this.lon], this.zoom);
          L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${environment.leafletToken}`, {
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: environment.leafletToken
        }).addTo(this.mymap);

        this.aggMarcador(this.lat, this.lon, "Mi ubicacion");
  }

  
  aggMarcador(lat:any, long:any, titulo:any){
    this.marker = L.marker([lat,long]).addTo(this.mymap);
    this.marker.bindPopup(`<b>${titulo} </b>`).openPopup();
    this.lat = lat;
    this.lon = long;
  }

  trazarRuta(latComercio:any, lonComercio:any){
    var Ruta = L.Routing.control({
      waypoints: [
        L.latLng(this.lat, this.lon),
        L.latLng(latComercio, lonComercio)
      ],
      lineOptions: {
        styles: [{color: '#688E26', opacity: 0.7, weight: 4}]
      }
    }).addTo(this.mymap);
  }
  
  onChange(deviceValue:any) {
    console.log(deviceValue.value);
    this.cambiarEstado(deviceValue.value);
}

cambiarEstado(estado:any){
  Swal.fire({
    title: 'Desea cambiar el estado de la orden?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, cambiar'
  }).then((result:any) => {
    
    if (result.isConfirmed) {
        this.estado = estado;
        this.ordenesService.cambiarEstado(this.OrdenPendiente[0]._id, this.estado).subscribe(
          res=>{
            console.log(res);
            this.cargarOrdenes();
          }
        );
        
        if(this.estado == 'Entregado'){
          this.motoristasService.cambiarObservacion(this.Motorista,'Disponible').subscribe(
            res=>{
              console.log(res);
            }
          );
        }
        else{
          this.motoristasService.cambiarObservacion(this.Motorista, 'Con Orden').subscribe(
            resp=>{
              console.log(resp);
            }
          );
        }
    }
  })
}
}
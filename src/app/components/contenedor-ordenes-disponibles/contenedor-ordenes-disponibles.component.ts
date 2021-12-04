import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MotoristasService } from 'src/app/services/motoristas.service';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
declare const L: any;
declare const Swal: any;

@Component({
  selector: 'app-contenedor-ordenes-disponibles',
  templateUrl: './contenedor-ordenes-disponibles.component.html',
  styleUrls: ['./contenedor-ordenes-disponibles.component.css']
})
export class ContenedorOrdenesDisponiblesComponent implements OnInit {
  faArrowLeft=faArrowLeft;
  faTrashAlt=faTrashAlt;
  faEdit=faEdit;
  faUserPlus=faUserPlus;
  zoom:any = 10;
  mymap:any="";
  marker:any ="";
  lat:any;
  lon:any;
  MotoristaC=this.cookieService.get('Motorista');
  constructor(private modalService:NgbModal, private ordenesService: OrdenesService, private motoristasService:MotoristasService, private cookieService: CookieService) { }
  ordenes:any;
  OrdenPendiente:any = [];
  OrdenSeleccionada:any;
  subtotal:any=0;
  envio:any=0;
  total:any = 0;
  Motorista:any;
  
  ngOnInit(): void {
    this.cargarOrdenes();
    this.obtenerMotorista();
  }


  verDetallesOrden(modal:any, idOrden:any){
    this.ordenesService.obtenerOrdenId(idOrden).subscribe(
      res=>{
        this.OrdenPendiente = res;
        this.OrdenSeleccionada = res[0]._id;
        console.log(this.OrdenPendiente[0]);
        this.lat = this.OrdenPendiente[0].usuario.Ubicacion.lat; 
        this.lon = this.OrdenPendiente[0].usuario.Ubicacion.lon;
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
    this.ordenesService.obtenerOrdenes().subscribe(
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
  obtenerMotorista(){
    this.motoristasService.obtenerUnMotoritas(this.MotoristaC).subscribe(
      res=>{
        console.log(res);
        this.Motorista = res;
      }
    );
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

        this.aggMarcador(this.lat, this.lon);
  }

  
  aggMarcador(lat:any, long:any){
    this.marker = L.marker([lat,long]).addTo(this.mymap);
    this.marker.bindPopup("<b>Ubicación Usuario </b>").openPopup();
    this.lat = lat;
    this.lon = long;
  }

  trazarRuta(latComercio:any, lonComercio:any){
    L.Routing.control({
      waypoints: [
        L.latLng(this.lat, this.lon),
        L.latLng(latComercio, lonComercio)
      ],
      lineOptions: {
        styles: [{color: '#688E26', opacity: 0.7, weight: 4}]
      }
    }).addTo(this.mymap);
  }
  
  tomarOrder(){
    console.log(this.Motorista[0].Observacion);
    if(this.Motorista[0].Observacion == 'Disponible' ){
      this.Disponible();
        this.ordenesService.tomarOrden(this.OrdenSeleccionada, this.MotoristaC).subscribe(
          res=>{
            console.log(res);
            this.cargarOrdenes()
          }
        );

        this.motoristasService.cambiarObservacion(this.MotoristaC, 'Con Orden').subscribe(
          res=>{
            console.log(res);
          }
        );

        
    }
    else{ 
      this.NoDisponible();
    }
  }

  NoDisponible(){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: `Ya cuentas con una orden tomada`,
      showConfirmButton: false,
      timer: 2500,
    });
  }

  Disponible(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `Orden Tomada`,
      showConfirmButton: false,
      timer: 2500,
    });
  }
}

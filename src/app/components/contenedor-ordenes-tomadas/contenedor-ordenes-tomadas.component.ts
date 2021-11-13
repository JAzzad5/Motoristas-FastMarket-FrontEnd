import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrdenesService } from 'src/app/services/ordenes.service';
import { environment } from 'src/environments/environment';
declare const L: any;

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
  constructor(private modalService:NgbModal,  private ordenesService: OrdenesService) { }
  ordenes:any;
  OrdenPendiente:any = [];
  subtotal:any=0;
  estado:any="Pendiente";
  
  
  ngOnInit(): void {
    this.ordenesService.obtenerOrdenesMotorista('618d5741b0ed19c7872d5519').subscribe(
      res=>{
        console.log(res);
        this.ordenes = res;
      },
      error=>{
        console.log(error);
      }
    );
  }
  
  
  
  verDetallesOrden(modal:any, idOrden:any){
    this.ordenesService.obtenerOrdenId(idOrden).subscribe(
      res=>{
        this.OrdenPendiente = res;
        console.log(this.OrdenPendiente[0]);
        this.lat = this.OrdenPendiente[0].usuario[0].Ubicacion.lat; 
        this.lon = this.OrdenPendiente[0].usuario[0].Ubicacion.lon;
        this.totalOrden();

        this.modalService.open(
          modal,
          {
            size:'xs',
            centered:true
          }
        );
        this.verMapa();
        this.trazarRuta(this.OrdenPendiente[0].productos[0]._id[0].Comercio[0].Ubicacion.lat, this.OrdenPendiente[0].productos[0]._id[0].Comercio[0].Ubicacion.lon)
      },
      error=>{
        console.log(error);
      }
    )

  }

  totalOrden(){
    this.subtotal=0;
    let productos = this.OrdenPendiente[0].productos;
    productos.forEach((producto:any) => {
      this.subtotal += producto.cantidad * producto._id[0].Precio;
      
      console.log(this.subtotal);
    });
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
  
  onChange(deviceValue:any) {
    console.log(deviceValue.value);
    this.estado = deviceValue.value;
}
}
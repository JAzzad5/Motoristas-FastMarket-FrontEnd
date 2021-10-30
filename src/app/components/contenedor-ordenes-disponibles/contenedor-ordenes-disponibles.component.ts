import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contenedor-ordenes-disponibles',
  templateUrl: './contenedor-ordenes-disponibles.component.html',
  styleUrls: ['./contenedor-ordenes-disponibles.component.css']
})
export class ContenedorOrdenesDisponiblesComponent implements OnInit {
  faArrowLeft=faArrowLeft;
  constructor(private modalService:NgbModal) { }

  ngOnInit(): void {
  }
  verDetallesOrden(modal:any){
    this.modalService.open(
      modal,
      {
        size:'s',
        centered:true
      }
    );
  }
  
}

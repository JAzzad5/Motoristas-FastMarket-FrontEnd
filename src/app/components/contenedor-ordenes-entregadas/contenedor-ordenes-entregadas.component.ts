import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faCircle } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contenedor-ordenes-entregadas',
  templateUrl: './contenedor-ordenes-entregadas.component.html',
  styleUrls: ['./contenedor-ordenes-entregadas.component.css']
})

export class ContenedorOrdenesEntregadasComponent implements OnInit {
  faArrowLeft=faArrowLeft;
  faCircle=faCircle;
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
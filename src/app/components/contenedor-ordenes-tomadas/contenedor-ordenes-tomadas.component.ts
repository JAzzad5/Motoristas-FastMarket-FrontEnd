import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faCircle } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contenedor-ordenes-tomadas',
  templateUrl: './contenedor-ordenes-tomadas.component.html',
  styleUrls: ['./contenedor-ordenes-tomadas.component.css']
})

export class ContenedorOrdenesTomadasComponent implements OnInit {
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
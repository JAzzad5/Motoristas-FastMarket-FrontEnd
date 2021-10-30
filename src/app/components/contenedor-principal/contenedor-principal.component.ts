import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faStar, faClock, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contenedor-principal',
  templateUrl: './contenedor-principal.component.html',
  styleUrls: ['./contenedor-principal.component.css']
})
export class ContenedorPrincipalComponent implements OnInit {
  faArrowLeft=faArrowLeft;
  faStar=faStar;
  faClock=faClock;
  faMoneyBillAlt=faMoneyBillAlt;
  constructor() { }

  ngOnInit(): void {
  }

}

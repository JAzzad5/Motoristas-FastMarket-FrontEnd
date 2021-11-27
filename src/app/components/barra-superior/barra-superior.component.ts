import { Component, OnInit } from '@angular/core';
import { faUser, faMapMarkerAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { MotoristasService } from 'src/app/services/motoristas.service';

@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css']
})
export class BarraSuperiorComponent implements OnInit {
  faUser = faUser;
  faMapMarkerAlt = faMapMarkerAlt;
  faShoppingCart = faShoppingCart;
  Motorista:any = "";
  User='618d5741b0ed19c7872d5519';
  
  constructor(private motoristaService:MotoristasService) { }

  ngOnInit(): void {
    this.motoristaService.obtenerUnMotoritas(this.User).subscribe(
      res=>{
        this.Motorista = res;
        console.log(this.Motorista)
      }
    );
  }

}

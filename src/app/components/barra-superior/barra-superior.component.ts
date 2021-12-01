import { Component, OnInit } from '@angular/core';
import { faUser, faMapMarkerAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { MotoristasService } from 'src/app/services/motoristas.service';
import { CookieService } from 'ngx-cookie-service';

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
  MotoristaC=this.cookieService.get('Motorista');
  
  constructor(private motoristaService:MotoristasService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.motoristaService.obtenerUnMotoritas(this.MotoristaC).subscribe(
      res=>{
        this.Motorista = res;
      }
    );
  }

}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MotoristasService {

  constructor(private httpClient:HttpClient) { }

  obtenerMotoristas():Observable<any>{
    return this.httpClient.get(`http://localhost:8888/motoristas`,{});
  }

  obtenerUnMotoritas(idMotorista:any){
    return this.httpClient.get(`http://localhost:8888/motoristas/${idMotorista}`,{});
  }

  cambiarObservacion(idMotorista:any,Observacion:any):Observable<any>{
    return this.httpClient.put(`http://localhost:8888/motoristas/${idMotorista}/${Observacion}/cambiarObservacion`,{});
  };
  
}

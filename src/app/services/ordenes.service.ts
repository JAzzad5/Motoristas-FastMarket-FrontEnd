import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  constructor(private httpClient:HttpClient) { }

  obtenerOrdenesUsuario(IdUsuario:any):Observable<any>{
    return this.httpClient.get(`http://localhost:8888/ordenes/usuario/${IdUsuario}`,{});
  };

  obtenerOrdenesMotorista(IdMotorista:any):Observable<any>{
    return this.httpClient.get(`http://localhost:8888/ordenes/motorista/${IdMotorista}`,{});
  };

  obtenerOrdenes():Observable<any>{
    return this.httpClient.get(`http://localhost:8888/ordenes/`,{});
  };

  obtenerOrdenId(Id:any):Observable<any>{
    return this.httpClient.get(`http://localhost:8888/ordenes/${Id}`,{});
  };

  tomarOrden(idOrden:any,idMotorista:any):Observable<any>{
    return this.httpClient.put(`http://localhost:8888/ordenes/${idOrden}/${idMotorista}/tomarOrden`,{});
  };

  cambiarEstado(idOrden:any,estado:any):Observable<any>{
    return this.httpClient.put(`http://localhost:8888/ordenes/${idOrden}/${estado}/cambiarEstado`,{});
  };
}

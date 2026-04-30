import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';[]
import { Observable } from 'rxjs';
import { Cliente } from '../modelo/Cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  //  URL da API
  private url:string = 'http://localhost:8080';

  constructor(private http:HttpClient){

  }

  //  Método para selecionar todos os clientes
  selecionar():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lugar } from './lugar';

@Injectable({
  providedIn: 'root',
})
export class LugarService {

  private readonly API = 'http://localhost:8080/lugares';
  
  constructor(private http:HttpClient) { }

  salvar(lugar: Lugar) : Observable<Lugar> {
    return this.http.post<Lugar>(this.API, lugar);
  }

  obterTodos() : Observable<Lugar[]> {
    return this.http.get<Lugar[]>(this.API);
  }

  filtrar(nome: string, categoria: string) : Observable<Lugar[]> {
    let params = new HttpParams()
    if(nome){
     params =   params.set('nome_like', nome);
    }
    if(categoria && categoria !== '-1'){
      params = params.set('categoria', categoria);
    }

    return this.http.get<Lugar[]>(this.API, { params } );
  }
}

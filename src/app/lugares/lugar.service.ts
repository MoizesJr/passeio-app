import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lugar } from './lugar';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LugarService {

  private readonly API = `${environment.apiUrl}/lugares`;
  
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
     params =   params.set('nome', nome);
    }
    if(categoria && categoria !== '-1'){
      params = params.set('categoria', categoria);
    }

    return this.http.get<Lugar[]>(this.API, { params } );
  }

  excluir(id: number) : Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  buscarPorId(id: number) : Observable<Lugar> {
    return this.http.get<Lugar>(`${this.API}/${id}`);
  }

  atualizar(lugar: Lugar) : Observable<Lugar> {
    return this.http.put<Lugar>(`${this.API}/${lugar.id}`, lugar);
  }

}

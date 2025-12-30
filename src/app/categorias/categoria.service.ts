import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from './categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  
  constructor(private http: HttpClient) { }

  private readonly API = 'http://localhost:8080/categorias';
  salvar(categoria: Categoria) : Observable<Categoria>{
    return this.http.post<Categoria>(this.API, categoria);
    }

  obterTodos() : Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.API);
  }
}


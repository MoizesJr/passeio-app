import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from './categoria';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  
  constructor(private http: HttpClient) { }

  private readonly API = `${environment.apiUrl}/categorias`;

  salvar(categoria: Categoria) : Observable<Categoria>{
    return this.http.post<Categoria>(this.API, categoria);
    }

  obterTodos() : Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.API);
  }

  atualizar(categoria: Categoria) : Observable<Categoria> {
    return this.http.put<Categoria>(`${this.API}/${categoria.id}`, categoria);
  }


  excluir(id: number): Observable<void> {
  return this.http.delete<void>(`${this.API}/${id}`);
}
}


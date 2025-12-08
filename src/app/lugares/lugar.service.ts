import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lugar } from './lugar';

@Injectable({
  providedIn: 'root',
})
export class LugarService {

  private readonly API = 'http://localhost:3000/lugares';
  
  constructor(private http:HttpClient) { }

  salvar(lugar: Lugar) : Observable<Lugar> {
    return this.http.post<Lugar>(this.API, lugar);
  }

  obterTodos() : Observable<Lugar[]> {
    return this.http.get<Lugar[]>(this.API);
  }
}

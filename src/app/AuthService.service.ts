import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface Usuario {
  id?: number;
  email: string;
  nome: string;
  perfil: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = 'http://localhost:8080/auth/login';
  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);

  constructor(private http: HttpClient) {
  const salvo = localStorage.getItem('usuario');
  if (salvo) {
    this.usuarioSubject.next(JSON.parse(salvo));
  }
}

  loginNoBackEnd(dadosGoogle: any): Observable<Usuario> {
    const usuarioParaEnviar = {
      email: dadosGoogle.email,
      nome: dadosGoogle.name
    };

    return this.http.post<Usuario>(this.API, usuarioParaEnviar).pipe(
      tap(usuario => {
        this.usuarioSubject.next(usuario);
        localStorage.setItem('usuario', JSON.stringify(usuario));
      })
    );
  }

  isAdmin(): boolean {
  return this.usuarioSubject.value?.perfil === 'ADMIN';
}

getUsuarioLogado(): Usuario | null {
  return this.usuarioSubject.value;
}

  logout() {
    this.usuarioSubject.next(null);
    localStorage.removeItem('usuario');
  }
}
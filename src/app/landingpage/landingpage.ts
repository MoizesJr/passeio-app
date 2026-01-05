import { Component } from '@angular/core';
import { Profile } from './profile.model';
import { Router } from '@angular/router';
import { AuthgoogleService } from '../authgoogle.service';

@Component({
  selector: 'app-landingpage',
  standalone: false,
  templateUrl: './landingpage.html',
  styleUrl: './landingpage.scss',
})
export class Landingpage {

profile: Profile | undefined;
  authService: any;

  constructor(
    private router: Router, 
    private loginService: AuthgoogleService
  ) {  }
    
    navegar() {
      this.router.navigate(['/paginas/galeria']);
    }

    logarComGoogle() { 
  this.loginService.login(); // 1. Faz o login no Google
  
  // 2. Escuta quando o login do Google termina e envia para Backend
  this.loginService.authState.subscribe((dadosGoogle: any) => {
    if (dadosGoogle) {
      this.authService.loginNoBackEnd(dadosGoogle).subscribe({
        next: (usuarioCompleto: any) => {
          console.log("Usuário autenticado no Postgres:", usuarioCompleto);
          this.router.navigate(['/paginas/galeria']);
        },
        error: (err: any) => console.error("Erro ao salvar no banco", err)
      });
    }
  });
}

    isLoggedIn() : boolean {
      const dadosGoogle = this.loginService.getLoggedProfile();
      console.log("Dados Google: ", dadosGoogle);
      this.profile = dadosGoogle;
      return !!this.profile;
    }

    imgError(event: any) {
  // Se o link falhar, ele tenta esse reserva automaticamente
  event.target.src = 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg';
}
}

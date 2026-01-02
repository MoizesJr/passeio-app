import { Component, OnInit } from '@angular/core';
import { LayoutProps } from './layoutprops';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router'; // Adicionado NavigationEnd
import { filter, map } from 'rxjs';
import { AuthgoogleService } from '../../authgoogle.service';
import { AuthService } from '../../AuthService.service'; // <--- IMPORTANTE: Importe seu serviço de banco

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout implements OnInit {

  props: LayoutProps = {
    titulo: '',
    subTitulo: ''
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loginService: AuthgoogleService, // Serviço do Google
    public authService: AuthService         // <--- INJETADO COMO PUBLIC: Resolve o erro de undefined
  ) { }

  ngOnInit(): void {
    // Carrega as propriedades da rota logo de início
    this.props = this.obterPropriedadesDaRota();

    // Escuta mudanças de rota para atualizar o título/subtítulo
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.obterPropriedadesDaRota())
      ).subscribe((props: LayoutProps) => {
        if (props) this.props = props;
      });
  }

  obterPropriedadesDaRota(): LayoutProps {
    let rotaFilha = this.activatedRoute.firstChild;
    while (rotaFilha?.firstChild) {
      rotaFilha = rotaFilha.firstChild;
    }
    return rotaFilha?.snapshot.data as LayoutProps || { titulo: '', subTitulo: '' };
  }

  logout() {
    this.loginService.logout(); // Limpa Google
    this.authService.logout();  // Limpa banco/localStorage
    this.router.navigate(['']);
  }
}
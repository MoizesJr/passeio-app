import { Component,OnInit } from '@angular/core';
import { Lugar } from '../../lugares/lugar';
import { Categoria } from '../../categorias/categoria';
import { LugarService } from '../../lugares/lugar.service';
import { CategoriaService } from '../../categorias/categoria.service';

@Component({
  selector: 'app-galeria',
  standalone: false,
  templateUrl: './galeria.html',
  styleUrl: './galeria.scss',
})
export class Galeria  implements OnInit {

  lugares: Lugar[] = [];
  categoriasFiltro: Categoria[] = [];
  nomeFiltro: string = '';
  categoriaFiltro: string = '';
categoria: any;

  constructor(
    private lugarService: LugarService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.categoriaService.obterTodos()
    .subscribe(categorias => this.categoriasFiltro = categorias);

    this.lugarService.obterTodos()
    .subscribe(lugares => this.lugares = lugares);
  }

  getTotalEstrelas(lugar: Lugar): string {
    return '★'.repeat(lugar.avaliacao ?? 0) + '☆'.repeat(5 - (lugar.avaliacao ?? 0));
    }

    filtrar() {
      this.lugarService.filtrar(this.nomeFiltro, this.categoriaFiltro)
      .subscribe(resultado => this.lugares = resultado);
    }

  }


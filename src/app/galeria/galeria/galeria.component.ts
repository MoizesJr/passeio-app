import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 

import { Lugar } from '../../lugares/lugar';
import { Categoria } from '../../categorias/categoria';
import { LugarService } from '../../lugares/lugar.service';
import { CategoriaService } from '../../categorias/categoria.service';

@Component({
  selector: 'app-galeria',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './galeria.html',
  styleUrl: './galeria.scss',
})

export class GaleriaComponent implements OnInit {

  lugares: Lugar[] = [];
  categoriasFiltro: Categoria[] = [];
  
  nomeFiltro: string = '';
  categoriaFiltro: string = '-1'; 

  constructor(
    private lugarService: LugarService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    // Carrega filtros
    this.categoriaService.obterTodos()
      .subscribe(categorias => this.categoriasFiltro = categorias);

    // Carrega lugares iniciais
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
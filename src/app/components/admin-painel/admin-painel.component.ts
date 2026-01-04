import { Component, OnInit, inject } from '@angular/core';
import { LugarService } from '../../lugares/lugar.service';
import { Lugar } from '../../lugares/lugar';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriaService } from '../../categorias/categoria.service';
import { Categoria } from '../../categorias/categoria';

@Component({
  selector: 'app-admin-painel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-painel.html',
  styleUrl: './admin-painel.scss',
})
export class AdminPainelComponent implements OnInit {

  private categoriaService = inject(CategoriaService);
  private lugarService = inject(LugarService);

    //filtro de busca para lugares
  lugaresFiltrados: Lugar[] = [];
  filtroBusca = new FormControl('');

  //filtro de busca para categorias
  categoriasFiltradas: Categoria[] = []; 
  filtroCategoria = new FormControl('');

  categorias: Categoria[] = [];
  lugares: Lugar[] = [];
  
  // Formulários Independentes
  formEdicao: FormGroup;
  formCategoria: FormGroup;
  
  // Controles de Visibilidade
  exibirFormulario = false;
  exibirFormCategoria = false;

  constructor() {
    // Inicialização do formulário de Lugares
    this.formEdicao = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl('', Validators.required),
      localizacao: new FormControl('', Validators.required),
      urlFoto: new FormControl('', Validators.required),
      avaliacao: new FormControl(0, [Validators.min(0), Validators.max(5)]),
      categoria: new FormControl(null, Validators.required)
    });

    // Inicialização do formulário de Categorias (Novo Padrão)
    this.formCategoria = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required) // Seguindo seu modelo de categoria
    });
  }

  ngOnInit(): void {
    this.carregarLugares();
    this.carregarCategorias();

    this.filtroCategoria.valueChanges.subscribe(valor => this.filtrarCategorias(valor || ''));

    this.filtroBusca.valueChanges.subscribe(valor => {
    this.filtrarLugares(valor || '');
  });
  }

  // --- MÉTODOS DE CARREGAMENTO ---
  carregarCategorias() {
    this.categoriaService.obterTodos().subscribe(dados => {
    this.categorias = dados;
    this.categoriasFiltradas = dados; // Inicializa a lista de exibição
  });
  }

  carregarLugares() {
    this.lugarService.obterTodos().subscribe(dados => {
    this.lugares = dados;
    this.lugaresFiltrados = dados; // Inicialmente, as duas são iguais
  });
  }

  filtrarCategorias(termo: string) {
  const termoLower = termo.toLowerCase();
  this.categoriasFiltradas = this.categorias.filter(cat => 
    cat.nome.toLowerCase().includes(termoLower)
  );
}

  filtrarLugares(termo: string) {
  const termoLower = termo.toLowerCase();
  this.lugaresFiltrados = this.lugares.filter(lugar => 
    lugar.nome.toLowerCase().includes(termoLower) || 
    lugar.localizacao.toLowerCase().includes(termoLower)
  );
}

  // --- LÓGICA DE LUGARES ---
  novoLugar() {
    this.exibirFormulario = true;
    this.formEdicao.reset();
    this.formEdicao.patchValue({ avaliacao: 0 });
  }

  prepararEdicao(lugar: Lugar) {
    this.exibirFormulario = true;
    this.formEdicao.patchValue(lugar);
  }

  salvarAlteracoes() {
    if (this.formEdicao.valid) {
      const dados = this.formEdicao.value;
      const acao$ = dados.id ? this.lugarService.atualizar(dados) : this.lugarService.salvar(dados);

      acao$.subscribe({
        next: () => {
          alert(dados.id ? 'Lugar atualizado!' : 'Lugar cadastrado!');
          this.exibirFormulario = false;
          this.carregarLugares();
        },
        error: (err) => console.error("Erro ao processar lugar:", err)
      });
    }
  }

  deletarLugar(id: number | undefined) {
    if (id && confirm('Tem certeza que deseja excluir este lugar?')) {
      this.lugarService.excluir(id).subscribe(() => this.carregarLugares());
    }
  }

  // --- LÓGICA DE CATEGORIAS (PADRÃO LUGARES) ---
  novaCategoria() {
    this.exibirFormCategoria = true;
    this.formCategoria.reset();
  }

  prepararEdicaoCategoria(categoria: Categoria) {
    this.exibirFormCategoria = true;
    this.formCategoria.patchValue(categoria);
  }

  salvarCategoria() {
    if (this.formCategoria.valid) {
      const dados = this.formCategoria.value;
      const acao$ = dados.id ? this.categoriaService.atualizar(dados) : this.categoriaService.salvar(dados);

      acao$.subscribe({
        next: () => {
          alert(dados.id ? 'Categoria atualizada!' : 'Categoria cadastrada!');
          this.exibirFormCategoria = false;
          this.carregarCategorias();
          this.carregarLugares(); // Recarrega lugares para atualizar nomes na tabela
        },
        error: (err) => console.error("Erro ao processar categoria:", err)
      });
    }
  }

  deletarCategoria(id: number | undefined) {
    if (id && confirm('Cuidado! Excluir uma categoria pode afetar os lugares vinculados. Continuar?')) {
      this.categoriaService.excluir(id).subscribe({
        next: () => {
          this.carregarCategorias();
          alert('Categoria removida!');
        },
        error: (err) => alert('Erro: Esta categoria pode estar em uso.')
      });
    }
  }

  compararCategorias(c1: Categoria, c2: Categoria): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
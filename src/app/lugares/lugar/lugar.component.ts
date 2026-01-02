import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/categoria.service';
import { LugarService } from '../lugar.service';

@Component({
  selector: 'app-lugar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lugar.html',
  styleUrl: './lugar.scss',
})
export class LugarComponent implements OnInit {

  camposForm: FormGroup;
  categorias: Categoria[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private lugarService: LugarService
  ) { 
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      // Inicia com null para validação funcionar
      categoria: new FormControl(null, Validators.required),
      localizacao: new FormControl('', Validators.required),
      urlFoto: new FormControl('', Validators.required),
      avaliacao: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(5)])
    });
  }

  ngOnInit(): void {
    this.categoriaService.obterTodos().subscribe({
      next: (dados) => {
        this.categorias = dados;
        console.log('Categorias carregadas:', dados);
      },
      error: (erro) => console.error('Erro ao carregar categorias', erro)
    });
  }

  salvar() {
    this.camposForm.markAllAsTouched();

    if (this.camposForm.valid) {
      console.log('Enviando:', this.camposForm.value);
      
      this.lugarService.salvar(this.camposForm.value).subscribe({
        next: () => {
            alert('Lugar salvo com sucesso!');
            this.camposForm.reset();
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao salvar');
        }
      });
    }
  }

  isCampoInvalido(nomeCampo: string): boolean { 
    const campo = this.camposForm.get(nomeCampo);
    return campo ? campo.invalid && (campo.dirty || campo.touched) : false;
  }
}
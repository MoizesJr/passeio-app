import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/categoria.service';
import { LugarService } from '../lugar.service';

@Component({
  selector: 'app-lugar',
  standalone: false,
  templateUrl: './lugar.html',
  styleUrl: './lugar.scss',
})
export class Lugar implements OnInit {

  camposForm: FormGroup;
  categorias: Categoria[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private lugarService: LugarService
  ) { 
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      localizacao: new FormControl('', Validators.required),
      urlFoto: new FormControl('', Validators.required),
      avaliacao: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)])
    });
  }

ngOnInit(): void {
   this.categoriaService.obterTodos().subscribe({
    next: (listaCategorias) => {
      console.log('Categorias obtidas: ', listaCategorias);
      
      this.categorias = listaCategorias
      }
    });
  }

  salvar() {
this.camposForm.markAllAsTouched();

if (this.camposForm.valid) {

    this.lugarService.salvar(this.camposForm.value)
    .subscribe({
      next: lugar => {
        console.log('Lugar salvo com sucesso: ', lugar);
        this.camposForm.reset();
      },
      error: erro => console.error('Erro ao salvar lugar: ', erro)
    });
  }
  }

  isCampoInvalido(nomeCampo: string): boolean { 
    const campo = this.camposForm.get(nomeCampo);
    return campo ? campo.invalid && (campo.dirty || campo.touched && campo?.errors?.['required']) : false;
  }
}

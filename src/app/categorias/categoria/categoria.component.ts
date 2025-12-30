import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './categoria.html',
  styleUrl: './categoria.scss',
})

export class CategoriaComponent {
  
  camposForm: FormGroup;

  constructor(private service: CategoriaService) {
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required)
    });
  }

  salvar() {
    this.camposForm.markAllAsTouched();

    if (this.camposForm.valid) {
      this.service
        .salvar(this.camposForm.value)
        .subscribe({
          next: (categoriaSalva) => {
            console.log('Salva com sucesso: ', categoriaSalva);
            alert('Categoria salva com sucesso!'); 
            this.camposForm.reset();
          },
          error: (erro) => {
            console.error('Erro ao salvar categoria: ', erro);
            alert('Erro ao salvar.');
          }
        });
    }
  }

  isCampoInvalido(nomeCampo: string): boolean { 
    const campo = this.camposForm.get(nomeCampo);
    return campo ? campo.invalid && (campo.dirty || campo.touched) : false;
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-depoimentos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './depoimentos.html',
})
export class DepoimentosComponent {

  muralDeClientes = [
    {
      nome: 'Mariana Souza',
      foto: 'assets/cliente1.jpg',
      nota: 5,
      texto: 'O passeio para a Praia dos Carneiros foi incrível! Organização impecável.'
    },
    {
      nome: 'Ricardo Lima',
      foto: 'assets/cliente2.jpg',
      nota: 5,
      texto: 'Melhor experiência em Porto de Galinhas. O guia conhece tudo!'
    },
    {
      nome: 'Juliana Paiva',
      foto: 'assets/cliente3.jpg',
      nota: 4,
      texto: 'Adorei o mergulho com peixinhos. Recomendo muito!'
    }
  ];
  // Função para gerar as estrelas visuais
  getEstrelas(nota: number) {
    return '★'.repeat(nota) + '☆'.repeat(5 - nota);
  }
  // Aqui você pode adicionar a função das estrelas se quiser usar no mural
  getTotalEstrelas(avaliacao: number) {
    let estrelas = '';
    for (let i = 0; i < 5; i++) {
      estrelas += i < avaliacao ? '★' : '☆';
    }
    return estrelas;
  }
}
import { Categoria } from '../categorias/categoria';

export interface Lugar {
  nome: string;
  categoria: Categoria;
  localizacao: string;
  urlFoto: string;
  avaliacao: number;
}
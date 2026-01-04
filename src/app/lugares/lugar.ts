import { Categoria } from '../categorias/categoria';

export interface Lugar {
id: number|undefined;
  nome: string;
  categoria: Categoria;
  localizacao: string;
  urlFoto: string;
  avaliacao: number;
}
import { Categoria } from '../categorias/categoria';

export interface Lugar {
  id?: number;
  nome: string;
  localizacao: string;
  urlFoto: string;
  avaliacao: number;
  categoria: Categoria;
  whatsapp?: string;
}
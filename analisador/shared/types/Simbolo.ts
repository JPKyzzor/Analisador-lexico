import { CategoriaSemanticaEnum } from "../enum/CategoriaSemantica.enum";
import { TipoSemanticoEnum } from "../enum/TipoSemantico.enum";

export type Simbolo = {
  nome: string;
  categoria: CategoriaSemanticaEnum;
  tipo: TipoSemanticoEnum;
  nivel: number;
  linha: number;
};

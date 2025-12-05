import { TokenInfo } from "../lexico/State/StateFactory";
import { CategoriaSemanticaEnum } from "../shared/enum/CategoriaSemantica.enum";
import { ErroSemanticoEnum } from "../shared/enum/ErroSemanticoEnum";
import { TipoSemanticoEnum } from "../shared/enum/TipoSemantico.enum";
import { TOKEN_CODES } from "../shared/enum/TokenCodes.enum";
import { TokenMap } from "../sintatico/producoes/tokenMap";

export type Simbolo = {
  nome: string;
  categoria: CategoriaSemanticaEnum;
  tipo: TipoSemanticoEnum;
  nivel: number;
};

export class TabelaSimbolo {
  private nivelAtual: number = 0;
  private simbolos: Simbolo[] = [];
  private inputTokens: TokenInfo[];

  constructor(inputTokens: TokenInfo[]) {
    this.inputTokens = inputTokens;
  }

  acaoSemantica(token: TokenMap, tokenAtual: number){
    switch (token.tokenCode) {
      case 49:
      case 54:
        return this.acaoSemanticaDclVar(tokenAtual);
    }
  }

  private acaoSemanticaDclVar(
    tokenAtual: number
  ) {
    type CustomSimbolo = Partial<Simbolo> & { linha: number };
    const variaveis: CustomSimbolo[] = [];
    let index = tokenAtual

    while (true) {
      const proximoToken = this.inputTokens[index];

      if (proximoToken?.code === TOKEN_CODES.NOMEVARIAVEL) {
        variaveis.push({
          linha: proximoToken.line!,
          nivel: this.nivelAtual,
          nome: proximoToken.value,
          categoria: CategoriaSemanticaEnum.Variavel,
        });
        index++;

        // Verifica se o próximo é vírgula para continuar
        const seguinte = this.inputTokens[index];
        if (seguinte?.code === TOKEN_CODES.VIRGULA) {
          index++; // Pula a vírgula
          continue;
        } else {
          // Próximo deve ser o tipo
          break;
        }
      } else {
        break;
      }
    }

    const tokenTipo = this.inputTokens[index+1];
    const code = tokenTipo?.code;
    if (
      code === TOKEN_CODES.INTEGER ||
      code === TOKEN_CODES.STRING ||
      code === TOKEN_CODES.FLOAT ||
      code === TOKEN_CODES.CHAR
    ) {
      const tipo = this.mapearTipo(tokenTipo.code);
      for (const variavel of variaveis) {
      const jaExiste = this.simbolos.some(
        s => s.nome === variavel.nome && s.nivel === this.nivelAtual
      );
      
      if (jaExiste) {
        throw new Error(`${ErroSemanticoEnum.VARIAVEL_JA_DECLARADA}, linha: ${variavel.linha}`)
      }
      
      this.simbolos.push({
        categoria: variavel.categoria,
        nivel: variavel.nivel,
        nome: variavel.nome,
        tipo: variavel.tipo,
      } as Simbolo);
      }
    }
  }

  private mapearTipo(tokenCode: number): TipoSemanticoEnum {
    switch (tokenCode) {
      case TOKEN_CODES.INTEGER:
        return TipoSemanticoEnum.INTEGER;
      case TOKEN_CODES.FLOAT:
        return TipoSemanticoEnum.FLOAT;
      case TOKEN_CODES.STRING:
        return TipoSemanticoEnum.STRING;
      case TOKEN_CODES.CHAR:
        return TipoSemanticoEnum.CHAR;
      default:
        throw new Error(`Tipo desconhecido: ${tokenCode}`);
    }
  }
}

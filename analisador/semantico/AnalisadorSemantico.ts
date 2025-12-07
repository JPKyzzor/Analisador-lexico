import { Logger, TipoAnalisadorEnum } from "../logger/logger";
import { configProjeto } from "../main";
import { CategoriaSemanticaEnum } from "../shared/enum/CategoriaSemantica.enum";
import { ErroSemanticoEnum } from "../shared/enum/ErroSemanticoEnum";
import { TipoSemanticoEnum } from "../shared/enum/TipoSemantico.enum";
import { TOKEN_CODES } from "../shared/enum/TokenCodes.enum";
import { Simbolo } from "../shared/types/Simbolo";
import { TokenInfo } from "../shared/types/TokenInfo";
import { TokenMap } from "../sintatico/producoes/tokenMap";

export class AnalisadorSemantico {
  private nivelAtual: number = 0;
  private simbolos: Simbolo[] = [];
  private inputTokens: TokenInfo[];

  constructor(inputTokens: TokenInfo[]) {
    this.inputTokens = inputTokens;
  }

  acaoSemantica(token: TokenMap, tokenAtual: number) {
    switch (token.tokenCode) {
      case 50:
        return this.declararFuncao(tokenAtual);
      case 7:
        return this.verificarVariavelDeclarada(tokenAtual);
      case 35:
        return this.diminuirNivel();
      case 36:
        return this.aumentarNivel();
      case 49:
      case 54:
        return this.acaoSemanticaDclVar(tokenAtual);
      case 34:
        return this.verificarSomaDeTiposIguais(tokenAtual);
    }
  }

  private declararFuncao(tokenAtual: number) {
    //verifica se é uma declaração de função
    const token = this.inputTokens[tokenAtual];
    const proximoToken = this.inputTokens[tokenAtual + 1];
    const tipo = this.mapearTipo(token.code);
    if (tipo !== undefined && proximoToken?.code === 7) {
      const simbolo: Simbolo = {
        categoria: CategoriaSemanticaEnum.Funcao,
        nivel: this.nivelAtual,
        nome: proximoToken.value,
        tipo: tipo,
        linha: token.line!,
      };
      this.addSimbolo(simbolo);
    }
  }

  private verificarSomaDeTiposIguais(tokenAtual: number) {
    const token1 = this.inputTokens[tokenAtual - 1];
    const token2 = this.inputTokens[tokenAtual + 1];
    if (!token1 || !token2) return;
    const tipo1 = this.getTipoByToken(token1);
    const tipo2 = this.getTipoByToken(token2);
    if (!tipo1 || !tipo2) return;
    if (tipo1 === TipoSemanticoEnum.CHAR) {
      throw new Error(
        `${ErroSemanticoEnum.SOMA_TIPO_DIFERENTE}:  Tipo char não pode ser concatenado, linha ${token1.line}`
      );
    }
    if (tipo2 === TipoSemanticoEnum.CHAR) {
      throw new Error(
        `${ErroSemanticoEnum.SOMA_TIPO_DIFERENTE}:  Tipo char não pode ser concatenado, linha ${token2.line}`
      );
    }

    if (tipo1 != tipo2) {
      throw new Error(
        `${ErroSemanticoEnum.SOMA_TIPO_DIFERENTE}:  ${tipo1} não pode ser somado ou concatenado com ${tipo2}, linha ${token1.line} `
      );
    }
  }

  private getTipoByToken(token: TokenInfo): TipoSemanticoEnum | undefined {
    if (token.code === TOKEN_CODES.NUMEROINTEIRO)
      return TipoSemanticoEnum.INTEGER;
    if (token.code === TOKEN_CODES.NUMEROFLOAT) return TipoSemanticoEnum.FLOAT;
    if (token.code === TOKEN_CODES.NOMEDASTRING)
      return TipoSemanticoEnum.STRING;
    if (token.code === TOKEN_CODES.NOMEDOCHAR) return TipoSemanticoEnum.CHAR;
    if (token.code === TOKEN_CODES.NOMEVARIAVEL) {
      const variavel = this.simbolos.find((s) => s.nome === token.value);
      if (!variavel) return undefined;
      return variavel.tipo;
    }
    return undefined;
  }

  private verificarVariavelDeclarada(tokenAtual: number) {
    const token = this.inputTokens[tokenAtual];
    const tokenAnterior = this.inputTokens[tokenAtual - 1];
    //apenas para garantir que não estamos em uma declaração de função
    const isDeclaracaoDeFunc =
      tokenAnterior?.code === TOKEN_CODES.INTEGER ||
      tokenAnterior?.code === TOKEN_CODES.FLOAT ||
      tokenAnterior?.code === TOKEN_CODES.CHAR ||
      tokenAnterior?.code === TOKEN_CODES.STRING;
    if (isDeclaracaoDeFunc) {
      return;
    }
    const existe = this.simbolos.some(
      (s) => s.nome === token.value && s.nivel <= this.nivelAtual
    );
    if (!existe) {
      throw new Error(
        `${ErroSemanticoEnum.VARIAVEl_NAO_DECLARADA} "${token.value}", linha: ${token.line}`
      );
    }
  }

  private acaoSemanticaDclVar(tokenAtual: number) {
    const variaveis: Partial<Simbolo>[] = [];
    let index = tokenAtual;
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
    const tokenTipo = this.inputTokens[index + 1];
    const code = tokenTipo?.code;
    if (
      code === TOKEN_CODES.INTEGER ||
      code === TOKEN_CODES.STRING ||
      code === TOKEN_CODES.FLOAT ||
      code === TOKEN_CODES.CHAR
    ) {
      const tipo = this.mapearTipo(tokenTipo.code);
      const simbolos: Simbolo[] = variaveis.map((v) => {
        return {
          categoria: v.categoria!,
          tipo: tipo!,
          nivel: v.nivel!,
          nome: v.nome!,
          linha: v.linha!,
        };
      });
      for (const s of simbolos) {
        this.addSimbolo(s);
      }
    }
  }

  private mapearTipo(tokenCode: number): TipoSemanticoEnum | undefined {
    switch (tokenCode) {
      case TOKEN_CODES.INTEGER:
        return TipoSemanticoEnum.INTEGER;
      case TOKEN_CODES.FLOAT:
        return TipoSemanticoEnum.FLOAT;
      case TOKEN_CODES.STRING:
        return TipoSemanticoEnum.STRING;
      case TOKEN_CODES.CHAR:
        return TipoSemanticoEnum.CHAR;
      case TOKEN_CODES.VOID:
        return TipoSemanticoEnum.VOID;
    }
  }

  private diminuirNivel() {
    const nivelAnterior = this.nivelAtual;
    const simbolosRemovidos = this.simbolos.filter(
      (simbolo) => simbolo.nivel === nivelAnterior
    );

    if (configProjeto.mostrarTabelaSimbolos) {
      simbolosRemovidos.forEach((simbolo) => {
        Logger.info(
          TipoAnalisadorEnum.SEMANTICO,
          `Simbolo: "${simbolo.nome}", nível: ${simbolo.nivel}, removido da lista de símbolos`
        );
      });
    }

    this.simbolos = this.simbolos.filter(
      (simbolo) => simbolo.nivel !== nivelAnterior
    );
    this.nivelAtual--;
    if (configProjeto.mostrarTabelaSimbolos) {
      Logger.info(
        TipoAnalisadorEnum.SEMANTICO,
        "Nível da lista de símbolos diminuido, nivel atual: " + this.nivelAtual
      );
    }
  }

  private aumentarNivel() {
    this.nivelAtual++;
    if (configProjeto.mostrarTabelaSimbolos) {
      Logger.info(
        TipoAnalisadorEnum.SEMANTICO,
        "Nível da lista de símbolos aumentado, nivel atual: " + this.nivelAtual
      );
    }
  }

  private addSimbolo(simbolo: Simbolo) {
    const existe = this.simbolos.some(
      (s) => s.nome === simbolo.nome && s.nivel <= this.nivelAtual
    );
    if (existe)
      throw new Error(
        `${ErroSemanticoEnum.IDENTIFICADOR_JA_USADO} "${simbolo.nome}", linha: ${simbolo.linha}`
      );
    if (configProjeto.mostrarTabelaSimbolos) {
      Logger.info(
        TipoAnalisadorEnum.SEMANTICO,
        `Simbolo: "${simbolo.nome}", nivel: ${simbolo.nivel}, adicionado na lista de símbolos`
      );
    }
    return this.simbolos.push(simbolo);
  }
}

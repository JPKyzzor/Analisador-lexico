import { TokenInfo } from "../shared/types/TokenInfo";
import { Producao, Producao1, PRODUCOES } from "./producoes/producoes";
import { TabelaParser } from "./producoes/tabela-parser";
import { TokenMap, TokenMapArray } from "./producoes/tokenMap";
import { Logger, TipoAnalisadorEnum } from "../logger/logger";
import { AnalisadorSemantico } from "../semantico/AnalisadorSemantico";
import { configProjeto } from "../main";

export class AnalisadorSintatico {
  private pilha: number[] = [44];

  private tokenAtual: number = 0;
  private tabelaParser = new TabelaParser();
  private inputTokens: TokenInfo[];
  private analisadorSemantico: AnalisadorSemantico;

  constructor(inputTokens: TokenInfo[]) {
    this.inputTokens = inputTokens;
    this.analisadorSemantico = new AnalisadorSemantico(inputTokens);
  }

  public Execute() {
    this.empilharProducao(new Producao1());

    while (this.pilha.length) {
      if (!this.aindaHaTokens()) {
        throw new Error("Código inalcançável identificado");
      }
      if (configProjeto.mostrarPilhaSintatico) {
        Logger.info(TipoAnalisadorEnum.SINTATICO, this.pilha.join("-"));
      }
      const topo = this.getTopoDaPilha();

      if (this.isFinal(topo)) break;
      if (this.isVazio(topo)) continue;

      const lexemaAtual = this.getTokenASerValidado();

      try {
        this.analisadorSemantico.acaoSemantica(topo, this.tokenAtual);
      } catch (error) {
        Logger.error(TipoAnalisadorEnum.SEMANTICO, error as string);
        if (configProjeto.quebrarNoSemantico) {
          throw new Error(error as string);
        }
      }

      if (topo.isTerminal) {
        this.consumirTerminal(topo, lexemaAtual);
      } else {
        this.expansaoNaoTerminal(topo, lexemaAtual);
      }
    }

    this.verificarSentencaCompleta();
    Logger.success(
      TipoAnalisadorEnum.SINTATICO,
      "Análise sintática concluída com sucesso"
    );
    Logger.success(
      TipoAnalisadorEnum.SEMANTICO,
      "Análise semântica concluída com sucesso"
    );
  }

  private aindaHaTokens(): boolean {
    return this.inputTokens.length >= this.tokenAtual;
  }

  private isFinal(topo: TokenMap): boolean {
    return topo.tokenCode === 44;
  }

  private isVazio(topo: TokenMap): boolean {
    return topo.tokenCode === 15;
  }

  private empilharProducao(producao: Producao) {
    for (let i = producao.tokens.length - 1; i >= 0; i--) {
      this.pilha.push(producao.tokens[i]);
    }
  }

  private getTopoDaPilha(): TokenMap {
    return TokenMapArray[this.pilha.pop()! - 1];
  }

  private consumirTerminal(topo: TokenMap, lexemaAtual: TokenMap): void {
    if (lexemaAtual.tokenCode === topo.tokenCode) {
      this.tokenAtual++;
      return;
    }
    const tokenInfoAtual = this.inputTokens[this.tokenAtual];
    throw new Error(
      `Token inesperado na linha: ${tokenInfoAtual.line}: '${lexemaAtual._symbol}', esperado: '${topo._symbol}'`
    );
  }

  private expansaoNaoTerminal(topo: TokenMap, lexemaAtual: TokenMap): void {
    const producao = this.tabelaParser.EncontrarProducao(topo, lexemaAtual);
    this.empilharProducao(producao);
  }

  private getTokenASerValidado(): TokenMap {
    const inputTokenAtual = this.inputTokens[this.tokenAtual];

    if (!inputTokenAtual) {
      throw new Error(
        `Fim inesperado do código na linha ${
          this.inputTokens[this.inputTokens.length - 1]?.line ?? "desconhecida"
        }.`
      );
    }

    const tokenMapAtual = TokenMapArray[inputTokenAtual.code - 1];
    if (!tokenMapAtual) {
      throw new Error(
        `Token code inválido (${inputTokenAtual.code}) encontrado na linha ${inputTokenAtual.line}.`
      );
    }

    return tokenMapAtual;
  }

  private verificarSentencaCompleta(): void {
    if (this.tokenAtual !== this.inputTokens.length)
      throw new Error("Sentença incompleta ou tokens restantes não consumidos");
  }
}

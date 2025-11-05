import { TokenInfo } from "../lexico/State/StateFactory";
import { Producao, Producao1, PRODUCOES } from "./producoes/producoes";
import { TabelaParser } from "./producoes/tabela-parser";
import { TokenMap, TokenMapArray } from "./producoes/tokenMap";
import { Logger, TipoAnalisadorEnum } from "../logger/logger";

export class AnalisadorSintatico {
  private pilha: number[] = [44];

  private tokenAtual: number = 0;
  private tabelaParser = new TabelaParser();
  private inputTokens: TokenInfo[];

  constructor(inputTokens: TokenInfo[]) {
    this.inputTokens = inputTokens;
  }

  public Execute() {
    this.empilharProducao(new Producao1());

    while (this.pilha.length) {
      if (!this.aindaHaTokens()) {
        throw new Error("Pilha esvaziou antes da sentença ser validada");
      }
      const topo = this.getTopoDaPilha();

      if (this.isFinal(topo)) break;
      if (this.isVazio(topo)) continue;

      const lexemaAtual = this.getTokenASerValidado();

      if (topo.isTerminal) {
        this.consumirTerminal(topo, lexemaAtual);
      } else {
        this.expansaoNaoTerminal(topo, lexemaAtual);
      }
    }

    this.verificarSentencaCompleta();
    Logger.success(TipoAnalisadorEnum.SINTATICO, "Análise sintática concluída com sucesso");
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

  private consumirTerminal(topo: TokenMap, lookahead: TokenMap): void {
    if (lookahead.tokenCode === topo.tokenCode) {
      this.tokenAtual++;
      return;
    }
    throw new Error(
      `Token inesperado: '${lookahead._symbol}', esperado: '${topo._symbol}'`
    );
  }

  private expansaoNaoTerminal(topo: TokenMap, lookahead: TokenMap): void {
    const producao = this.tabelaParser.EncontrarProducao(topo, lookahead);
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

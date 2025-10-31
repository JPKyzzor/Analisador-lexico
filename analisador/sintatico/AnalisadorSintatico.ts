import { TokenInfo } from "../lexico/State/StateFactory";
import { Producao, PRODUCOES } from "./producoes/producoes";
import { TabelaParser } from "./producoes/tabela-parser";
import { TokenMap } from "./producoes/tokenMap";

export class AnalisadorSintatico {
  private pilha: number[] = [44];
  private producoes = PRODUCOES;

  private tokenAtual: number = 0;
  private tabelaParser = new TabelaParser();

  public Execute(tokens: TokenInfo[]) {
    this.empilharProducao(this.producoes[0]);

    while (this.pilha.length) {
      if (!this.existeCodigo(tokens, this.tokenAtual)){
        throw new Error("Pilha esvaziou antes da sentença ser validada");
      }
      const topoDaPilha = this.pilha.pop()!;
      if (topoDaPilha == 44){
        break;
      }

      const tokenASerValidado = tokens[this.tokenAtual];
      const token = TokenMap[topoDaPilha - 1];
      if (token.isTerminal) {
        const isTokenEsperado = tokenASerValidado.code === topoDaPilha;
        if (isTokenEsperado) {
          this.tokenAtual++;
          continue;
        } else {
          throw new Error("Token inesperado: " + tokens[this.tokenAtual].value);
        }
      } else {
        const producao = this.tabelaParser.EncontrarProducao(
          topoDaPilha,
          tokenASerValidado.code
        );
        this.empilharProducao(producao);
      }
    }

    if(this.pilha.length){
      
    }
  }

  private existeCodigo(tokens: TokenInfo[], tokenAtual: number): boolean {
    return tokens.length <= tokenAtual;
  }

  private empilharProducao(producao: Producao) {
    for (let i = producao.tokens.length - 1; i >= 0; i--) {
      this.pilha.push(producao.tokens[i]);
    }
  }
}

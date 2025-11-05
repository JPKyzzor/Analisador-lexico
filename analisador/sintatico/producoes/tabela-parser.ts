import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { TokenMap, TokenMapArray } from "./tokenMap";
import { Producao, Producao1, PRODUCOES } from "./producoes";

export class TabelaParser {
  private tabela: Record<number, Record<number, number>> = {};
  private symbolToCode: Record<string, number> = {};

  constructor() {
    this.inicializarTabela();
  }

  private inicializarTabela(): void {
    this.montarMapaDeSimbolos();
    const registrosCSV = this.lerTabelaCSV();
    this.montarTabelaPreditiva(registrosCSV);
  }

  private montarMapaDeSimbolos(): void {
    for (const token of TokenMapArray) {
      this.symbolToCode[token._symbol.toLowerCase()] = token.tokenCode;
    }
  }

  private lerTabelaCSV(): Record<string, string>[] {
    const filePath = path.resolve(__dirname, "tabela.csv");
    if (!fs.existsSync(filePath)) {
      throw new Error(`Arquivo tabela.csv não encontrado em: ${filePath}`);
    }

    const csvContent = fs.readFileSync(filePath, "utf-8");

    return parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
    }) as Record<string, string>[];
  }

  private montarTabelaPreditiva(records: Record<string, string>[]): void {
    for (const row of records) {
      const nonTerminalSymbol = (row[""] || "").trim();
      if (!nonTerminalSymbol) continue;

      const naoTerminal = this.symbolToCode[nonTerminalSymbol.toLowerCase()];
      if (!naoTerminal) continue;

      this.tabela[naoTerminal] = {};

      for (const [colSymbol, value] of Object.entries(row)) {
        if (!colSymbol || !value || isNaN(Number(value))) continue;

        const terminalSymbol = colSymbol.trim().toLowerCase();
        const terminalCode = this.symbolToCode[terminalSymbol];
        if (!terminalCode) continue;

        this.tabela[naoTerminal][terminalCode] = Number(value);
      }
    }
  }

  public EncontrarProducao(
    topoDaPilha: TokenMap,
    tokenASerValidado: TokenMap
  ): Producao{
    const linha = this.tabela[topoDaPilha.tokenCode];
    if (!linha) throw new Error(`Linha não encontrada: ${topoDaPilha}`)

    const numeroProducao = linha[tokenASerValidado.tokenCode];
    if (!numeroProducao)
      throw new Error(
        `Combinação topo:${topoDaPilha._symbol} e tokenASerValidado:${tokenASerValidado._symbol} inválida`
      );

    return this.instanciarProducao(numeroProducao);
  }

  private instanciarProducao(numero: number): Producao {
    return PRODUCOES[numero - 1];
  }
}

import * as fs from "fs";
import { StateFactory, TokenInfo } from "./State/StateFactory";

export class AnalisadorLexico {
  private codigo: string;
  private line: number = 1;
  private column: number = 1;
  private index: number = 0;

  constructor(filePath: string) {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Arquivo não encontrado: ${filePath}`);
    }
    this.codigo = fs.readFileSync(filePath, "utf8");
  }

  public Execute(): TokenInfo[] {
    const tokenArray: TokenInfo[] = [];
    this.index = 0;
    this.column = 1;
    this.line = 1;

    while (this.hasText()) {
      const char = this.codigo[this.index];

      if (this.isEndOfLineCheck(char)) continue;
      if (this.isWhitespaceCheck(char)) continue;

      const state = StateFactory.create(char);
      if (!state) {
        this.handleUnknownCharacter(char);
        return tokenArray; // retorna até onde conseguiu
      }

      const response = state.process(this.codigo, this.index);
      if (!response.success) {
        this.handleLexicalError(
          this.line,
          this.column,
          response.analisedCharacters
        );
        return tokenArray; // retorna até onde conseguiu
      }

      this.index += response.analisedCharacters;
      this.column += response.analisedCharacters;

      if (response.tokenInfo) {
        tokenArray.push(response.tokenInfo);
      }
    }

    this.handleValidationSuccess();
    return tokenArray;
  }

  private isEndOfLineCheck(char: string): boolean {
    const isEndOfLine = char === "\n";
    if (isEndOfLine) {
      this.index++;
      this.line++;
      this.column = 1;
    }
    return isEndOfLine;
  }

  private hasText(): boolean {
    return this.index < this.codigo.length;
  }

  private isWhitespaceCheck(char: string): boolean {
    const isWhitespace = /\s/.test(char);
    if (isWhitespace) {
      this.index++;
      this.column++;
    }
    return isWhitespace;
  }

  private handleUnknownCharacter(char: string): void {
    console.log(
      `❌ Caracter não reconhecido '${char}' na linha ${this.line}, caracter ${this.column}`
    );
  }

  private handleLexicalError(
    line: number,
    column: number,
    length: number
  ): void {
    console.log(
      `❌ Erro léxico na linha ${line}, caracter ${column} até caracter ${
        column + length
      }`
    );
  }

  private handleValidationSuccess(): void {
    console.log("✅ Código validado com sucesso.");
  }
}

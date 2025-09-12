import * as fs from "fs";
import { StateFactory, TokenInfo } from "./State/StateFactory";
import { TOKEN_CODES } from "./enum/TokenCodes.enum";

export class AnalisadorLexico {
  private inputCode: string;
  private line: number = 1;
  private column: number = 1;
  private index: number = 0;

  constructor(filePath: string) {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Arquivo não encontrado: ${filePath}`);
    }
    this.inputCode = fs.readFileSync(filePath, "utf8");
  }

  public Execute(): { tokens: TokenInfo[]; errorMessage?: string } {
    const tokens: TokenInfo[] = [];
    this.index = 0;
    this.column = 1;
    this.line = 1;

    while (this.hasText()) {
      const char = this.inputCode[this.index];

      if (this.isEndOfLineCheck(char)) continue;
      if (this.isWhitespaceCheck(char)) continue;

      const state = StateFactory.create(char);
      if (!state) {
        const errorMessage = this.handleUnknownCharacter(char);
        return { tokens, errorMessage}; // retorna até onde conseguiu
      }

      const response = state.process(this.inputCode, this.index);
      if (!response.success) {
        const errorMessage = this.handleLexicalError(
          this.line,
          this.column,
        );
        return { tokens, errorMessage }; // retorna até onde conseguiu
      }

      this.index += response.analisedCharacters;
      this.column += response.analisedCharacters;
      this.line += response.analisedLines;

      if (this.isCommentToken(response.tokenInfo)) continue;

      response.tokenInfo.line = this.line;
      tokens.push(response.tokenInfo);
    }

    this.handleValidationSuccess();
    return { tokens };
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
    return this.index < this.inputCode.length;
  }

  private isCommentToken(tokenInfo: TokenInfo): boolean {
    return tokenInfo.code === TOKEN_CODES.COMENTARIO;
  }

  private isWhitespaceCheck(char: string): boolean {
    const isWhitespace = /\s/.test(char);
    if (isWhitespace) {
      this.index++;
      this.column++;
    }
    return isWhitespace;
  }

  private handleUnknownCharacter(char: string): string {
    return `❌ Caracter não reconhecido '${char}' na linha ${this.line}, caracter ${this.column}`;
  }

  private handleLexicalError(
    line: number,
    column: number,
  ): string {
    return `❌ Erro léxico próximo da linha ${line}, caracter ${column}`;
  }

  private handleValidationSuccess(): void {
    console.log("✅ Código validado com sucesso.");
  }
}

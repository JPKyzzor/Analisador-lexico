import { StateFactory } from "./StateFactory";

export class AnalisadorLexico {
  private codigo:string;

  constructor(codigo:string){
    this.codigo = codigo
  }

  public Execute(): void {
    let index = 0;
    while (index < this.codigo.length) {
      if (this.isWhitespace(this.codigo[index])) {
        index++;
        continue;
      }

      const state = StateFactory.create(this.codigo[index]);
      if (!state) {
        this.handleUnknownCharacter(this.codigo[index]);
        return;
      }

      const response = state.process(this.codigo, index);
      if (!response.success) {
        this.handleLexicalError(index, response.analisedCharacters);
        return;
      }
      index += response.analisedCharacters;
    }
    this.handleValidationSuccess();
  }

  private isWhitespace(char: string): boolean {
    return /\s/.test(char);
  }

  private handleUnknownCharacter(char: string): void {
    console.log("Caracter não presente:", char);
  }

  private handleLexicalError(start: number, length: number): void {
    console.log(
      `Erro léxico entre os caracteres ${start}-${start + length}`
    );
  }

  private handleValidationSuccess(): void {
    console.log("Código validado.");
  }
}

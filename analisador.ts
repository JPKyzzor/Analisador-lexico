import { StateFactory } from "./StateFactory";

const codigo: string = `
  teste teste teste 123 @
`;

export class AnalisadorLexico {
  static execute(codigo: string): void {
    let index = 0;
    while (index < codigo.length) {
      // Ignora espaços, tabs e quebras de linha
      if (codigo[index].match(/\s/)) {
        index++;
        continue;
      }

      let state = StateFactory.create(codigo[index]);
      if (!state) {
        console.log("Caracter não presente:", codigo[index]);
        return;
      }

      let response = state.process(codigo, index);
      if (!response.success) {
        console.log(
          `Erro léxico entre os caracteres ${index}-${
            index + response.analisedCharacters
          }`
        );
        return;
      }
      index += response.analisedCharacters;
    }
    console.log("Código validado.");
  }
}

AnalisadorLexico.execute(codigo);

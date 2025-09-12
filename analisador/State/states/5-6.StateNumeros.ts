import { StateResponse } from "../StateFactory";
import { TOKEN_CODES } from "../../enum/TokenCodes.enum";
import { BaseState } from "./BaseState";

export class StateNumero extends BaseState {
  process(codigo: string, index: number): StateResponse {
    const start = index;
    let analisedCharacters = 0;
    let hasDot = false;

    // Primeiro caractere já é um número
    analisedCharacters++;
    index++;

    while (codigo[index]) {
      if (/[0-9]/.test(codigo[index])) {
        analisedCharacters++;
        index++;
      } else if (!hasDot && codigo[index] === ".") {
        // Permite apenas um ponto
        hasDot = true;
        analisedCharacters++;
        index++;
        // Após o ponto, deve haver pelo menos um número
        if (!/[0-9]/.test(codigo[index])) {
          return this.fail(analisedCharacters);
        }
      } else {
        break;
      }
    }
    const tokenCode = hasDot
      ? TOKEN_CODES.NUMEROFLOAT
      : TOKEN_CODES.NUMEROINTEIRO;
    return this.success(codigo, tokenCode, start, analisedCharacters);
  }
}
import { StateResponse } from "../StateFactory";
import { TOKEN_CODES } from "../../enum/TokenCodes.enum";
import { BaseState } from "./BaseState";

export class StateNumero extends BaseState {
  process(inputCode: string, index: number): StateResponse {
    const start = index;
    let analisedCharacters = 0;
    let hasDot = false;

    // Primeiro caractere já é um número
    analisedCharacters++;
    index++;

    while (inputCode[index]) {
      if (/[0-9]/.test(inputCode[index])) {
        analisedCharacters++;
        index++;
      } else if (!hasDot && inputCode[index] === ".") {
        // Permite apenas um ponto
        hasDot = true;
        analisedCharacters++;
        index++;
        // Após o ponto, deve haver pelo menos um número
        if (!/[0-9]/.test(inputCode[index])) {
          return this.fail(analisedCharacters);
        }
      } else {
        break;
      }
    }
    const tokenCode = hasDot
      ? TOKEN_CODES.NUMEROFLOAT
      : TOKEN_CODES.NUMEROINTEIRO;
    return this.success(inputCode, tokenCode, start, analisedCharacters);
  }
}
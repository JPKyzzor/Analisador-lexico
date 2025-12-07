import { StateResponse } from "../../../shared/types/StateResponse";
import { TOKEN_CODES } from "../../../shared/enum/TokenCodes.enum";
import { BaseState } from "./BaseState";

export class StateNumero extends BaseState {
  process(inputCode: string, index: number): StateResponse {
    const start = index;
    let analisedCharacters = 0;
    let hasDot = false;

    // Primeiro caractere pode ser um menos
    if (inputCode[index] === "-") {
      analisedCharacters++;
      index++;
    }

    // Próximo caractere deve ser um número
    if (!/[0-9]/.test(inputCode[index])) {
      return this.fail(analisedCharacters);
    }

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

    const lexema = inputCode.substring(start, start + analisedCharacters);
    const numValue = hasDot ? parseFloat(lexema) : parseInt(lexema);

    if (!hasDot && (numValue < -2147483648 || numValue > 2147483647)) {
      return this.fail(analisedCharacters);
    }

    const tokenCode = hasDot
      ? TOKEN_CODES.NUMEROFLOAT
      : TOKEN_CODES.NUMEROINTEIRO;
    return this.success(inputCode, tokenCode, start, analisedCharacters);
  }
}

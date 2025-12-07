import { StateResponse } from "../../../shared/types/StateResponse";
import { TOKEN_CODES } from "../../../shared/enum/TokenCodes.enum";
import { BaseState } from "./BaseState";

export class StateBarra extends BaseState {
  process(inputCode: string, index: number): StateResponse {
    const nextChar = inputCode[index + 1];
    const start = index;

    // Comentário de linha //
    if (nextChar === "/") {
      let i = index + 2;
      while (i < inputCode.length && inputCode[i] !== "\n") {
        i++;
      }
      const analisedCharacters = i - index;
      return this.success(
        inputCode,
        TOKEN_CODES.COMENTARIO,
        start,
        analisedCharacters
      );
    }

    // Comentário de bloco /* ... */
    if (nextChar === "-") {
      let i = index + 2;
      let linesJumped = 0;
      while (i < inputCode.length - 1) {
        if (inputCode[i] === "\n") {
          linesJumped++;
          i++;
          continue;
        }

        if (inputCode[i] === "-" && inputCode[i + 1] === "/") {
          i += 2;
          const analisedCharacters = i - index;
          return this.success(
            inputCode,
            TOKEN_CODES.COMENTARIO,
            start,
            analisedCharacters,
            linesJumped
          );
        }
        i++;
      }
      //não fechou comentario
      return this.fail(inputCode.length - index);
    }

    //operador /
    return this.success(inputCode, TOKEN_CODES.BARRA, start, 1);
  }
}

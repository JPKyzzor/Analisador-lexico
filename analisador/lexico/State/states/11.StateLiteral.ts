import { TOKEN_CODES } from "../../../shared/enum/TokenCodes.enum";
import { BaseState } from "./BaseState";
import { StateResponse } from "../../../shared/types/StateResponse";

export class StateLiteral extends BaseState {
  process(inputCode: string, index: number): StateResponse {
    const start = index;
    let i = index + 1;

    while (i < inputCode.length && inputCode[i] !== "`") {
      // quebra de linha dentro do literal não é permitida
      if (inputCode[i] === "\n" || inputCode[i] === "\r") {
        return this.fail(i - index);
      }
      i++;
    }

    if (i >= inputCode.length) {
      return this.fail(i - index);
    }
    const analisedCharacters = i - index + 1;
    return this.success(
      inputCode,
      TOKEN_CODES.LITERAL,
      start,
      analisedCharacters
    );
  }
}

import { TOKEN_CODES } from "../../enum/TokenCodes.enum";
import { BaseState } from "./BaseState";
import { StateResponse } from "../StateFactory";

export class StateNomeDaString extends BaseState {
  process(inputCode: string, index: number): StateResponse {
    const start = index;
    let i = index + 1;
    while (i < inputCode.length && inputCode[i] !== '"') {
      i++;
    }

    if (i >= inputCode.length) {
      return this.fail(i - index);
    }
    const analisedCharacters = i - index + 1;
    return this.success(
      inputCode,
      TOKEN_CODES.NOMEDASTRING,
      start,
      analisedCharacters
    ); // aceita vazio "" ou conteúdo
  }
}

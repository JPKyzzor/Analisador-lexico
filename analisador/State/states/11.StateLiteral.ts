import { TOKEN_CODES } from "../../enum/TokenCodes.enum";
import { BaseState } from "./BaseState";
import { StateResponse } from "../StateFactory";

export class StateLiteral extends BaseState {
  process(inputCode: string, index: number): StateResponse {
    const start = index;
    let i = index + 1;
    while (i < inputCode.length && inputCode[i] !== "`") {
      i++;
    }

    if (i >= inputCode.length) {
      return this.fail(i - index);
    }

    return this.success(inputCode, TOKEN_CODES.LITERAL, start, i - index + 1);
  }
}

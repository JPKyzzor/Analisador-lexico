import { StateResponse } from "../StateFactory";
import { TOKEN_CODES } from "../../../shared/enum/TokenCodes.enum";
import { BaseState } from "./BaseState";

export class StateMais extends BaseState {
  process(inputCode: string, index: number): StateResponse {
    const nextChar = inputCode[index + 1];
    const start = index;
    if (nextChar === "+") {
      return this.success(inputCode, TOKEN_CODES.INCREMENTO, start, 2);
    }
    return this.success(inputCode, TOKEN_CODES.MAIS, start, 1);
  }
}
import { StateResponse } from "../../../shared/types/StateResponse";
import { TOKEN_CODES } from "../../../shared/enum/TokenCodes.enum";
import { BaseState } from "./BaseState";

export class StateMenor extends BaseState {
  process(inputCode: string, index: number): StateResponse {
    const start = index;
    const nextChar = inputCode[index + 1];
    if (nextChar === "=") {
      return this.success(inputCode, TOKEN_CODES.MENOR_IGUAL, start, 2);
    }
    if (nextChar === "<") {
      return this.success(inputCode, TOKEN_CODES.SHIFT_LEFT, start, 2);
    }
    return this.success(inputCode, TOKEN_CODES.MENOR, start, 1);
  }
}

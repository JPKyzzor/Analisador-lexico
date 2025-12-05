import { StateResponse } from "../StateFactory";
import { TOKEN_CODES } from "../../../shared/enum/TokenCodes.enum";
import { BaseState } from "./BaseState";

export class StateIgual extends BaseState {
  process(inputCode: string, index: number): StateResponse {
    const nextChar = inputCode[index + 1];
    const start = index;
    if (nextChar === "=") {
      return this.success(inputCode, TOKEN_CODES.IGUAL, start, 2);
    }
    return this.success(inputCode, TOKEN_CODES.ATRIBUICAO, start, 1);
  }
}
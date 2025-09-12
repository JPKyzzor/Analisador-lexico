import { StateResponse } from "../StateFactory";
import { TOKEN_CODES } from "../../enum/TokenCodes.enum";
import { BaseState } from "./BaseState";

export class StateDiferente extends BaseState {
  process(inputCode: string, index: number): StateResponse {
    const nextChar = inputCode[index + 1];
    const start = index;
    if (nextChar === "=") {
      return this.success(inputCode, TOKEN_CODES.DIFERENTE, start, 2);
    }
    return this.fail(1);
  }
}
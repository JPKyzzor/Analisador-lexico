import { StateResponse } from "../StateFactory";
import { TOKEN_CODES } from "../../enum/TokenCodes.enum";
import { BaseState } from "./BaseState";
export class StateNomeDoChar extends BaseState {
  process(inputCode: string, start: number): StateResponse {
    if (inputCode[start + 1] === "'") {
      return this.success(inputCode, TOKEN_CODES.NOMEDOCHAR, start, 2);
    }
    if (inputCode[start + 2] === "'") {
      return this.success(inputCode, TOKEN_CODES.NOMEDOCHAR, start, 3);
    }
    return { success: false, analisedCharacters: 3 };
  }
}
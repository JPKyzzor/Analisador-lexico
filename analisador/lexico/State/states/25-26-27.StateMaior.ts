import { StateResponse } from "../StateFactory";
import { TOKEN_CODES } from "../../enum/TokenCodes.enum";
import { BaseState } from "./BaseState";

export class StateMaior extends BaseState {
  process(inputCode: string, index: number): StateResponse {
    const nextChar = inputCode[index + 1];
    const start = index;
    if (nextChar === ">") {
      return this.success(inputCode, TOKEN_CODES.SHIFT_RIGHT, start, 2);
    }
    if (nextChar === "=") {
      return this.success(inputCode, TOKEN_CODES.MAIOR_IGUAL, start, 2);
    }
    return this.success(inputCode, TOKEN_CODES.MAIOR, start, 1);
  }
}
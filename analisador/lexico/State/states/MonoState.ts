import { StateResponse } from "../StateFactory";
import { TOKEN_CODES } from "../../../shared/enum/TokenCodes.enum";
import { BaseState } from "./BaseState";

export class MonoState extends BaseState {
  constructor(private readonly tokenCode: number) {
    super();
  }

  process(inputCode: string, index: number): StateResponse {
    return this.success(inputCode, this.tokenCode, index, 1);
  }
}

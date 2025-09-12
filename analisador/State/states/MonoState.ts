import { StateResponse } from "../StateFactory";
import { TOKEN_CODES } from "../../enum/TokenCodes.enum";
import { BaseState } from "./BaseState";

export class MonoState extends BaseState {
  constructor(private readonly tokenCode: number) {
    super();
  }

  process(codigo: string, index: number): StateResponse {
    return this.success(codigo, this.tokenCode, index, 1);
  }
}

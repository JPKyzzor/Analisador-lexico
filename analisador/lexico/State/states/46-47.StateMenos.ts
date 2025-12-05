import { StateResponse } from "../StateFactory";
import { TOKEN_CODES } from "../../../shared/enum/TokenCodes.enum";
import { BaseState } from "./BaseState";
import { StateNumero } from "./5-6.StateNumeros";

export class StateMenos extends BaseState {
  process(inputCode: string, index: number): StateResponse {
    const nextChar = inputCode[index + 1];
    const start = index;
    if (nextChar === "-") {
      return this.success(inputCode, TOKEN_CODES.DECREMENTO, start, 2);
    }
    //numeros negativos 
    if(/[0-9]/.test(nextChar)){
      const stateNumber = new StateNumero();
      return stateNumber.process(inputCode, index)
    }
    return this.success(inputCode, TOKEN_CODES.MENOS, start, 1);
  }
}
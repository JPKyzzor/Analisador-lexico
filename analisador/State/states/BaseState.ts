import { State, StateResponse, TokenInfo } from "../StateFactory";

export abstract class BaseState implements State {
  protected success(
    inputCode: string,
    tokenCode: number,
    startIndex: number,
    analisedCharacters: number
  ): StateResponse {
    const tokenInfo: TokenInfo = {
      code: tokenCode,
      value: inputCode.slice(startIndex, startIndex + analisedCharacters),
    };
    return {
      success: true,
      analisedCharacters,
      tokenInfo,
    };
  }

  protected fail(analisedCharacters: number): StateResponse {
    return {
      success: false,
      analisedCharacters,
    };
  }

  abstract process(codigo: string, index: number): StateResponse;
}
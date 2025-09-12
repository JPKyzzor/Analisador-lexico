import { State, StateResponse, TokenInfo } from "../StateFactory";

export abstract class BaseState implements State {
  protected success(
    inputCode: string,
    tokenCode: number,
    startIndex: number,
    analisedCharacters: number,
    analisedLines: number = 0
  ): StateResponse {
    const tokenInfo: TokenInfo = {
      code: tokenCode,
      value: inputCode.slice(startIndex, startIndex + analisedCharacters),
    };
    return {
      success: true,
      analisedCharacters,
      analisedLines,
      tokenInfo,
    };
  }

  protected fail(analisedCharacters: number, analisedLines = 0): StateResponse {
    return {
      success: false,
      analisedCharacters,
      analisedLines
    };
  }

  abstract process(inputCode: string, index: number): StateResponse;
}
import { TokenInfo } from "./TokenInfo";

export type StateResponse =
  | {
      success: true;
      analisedCharacters: number;
      analisedLines: number;
      tokenInfo: TokenInfo;
    }
  | {
      success: false;
      analisedCharacters: number;
      analisedLines: number;
      tokenInfo?: never;
    };

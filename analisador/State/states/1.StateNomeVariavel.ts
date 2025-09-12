import { StateResponse } from "../StateFactory";
import { TOKEN_CODES } from "../../enum/TokenCodes.enum";
import { BaseState } from "./BaseState";

export class StateNomeVariavel extends BaseState {
  process(inputCode: string, index: number): StateResponse {
    const start = index;
    let analisedCharacters = 0;

    if (!inputCode[index].match(/[a-z]/)) {
      return this.fail(1);
    }

    analisedCharacters++;
    index++;

    // Pode seguir com letras (maiusculas/minusculas), números ou _
    while (inputCode[index] && inputCode[index].match(/[a-zA-Z0-9_]/)) {
      analisedCharacters++;
      index++;
    }
    const value = inputCode.slice(start, start + analisedCharacters);
    const tokenCode = this.getTokenByText(value);
    return this.success(inputCode, tokenCode, start, analisedCharacters);
  }

  private getTokenByText(value: string): TOKEN_CODES {
    switch (value) {
      case "while":
        return TOKEN_CODES.WHILE;
      case "void":
        return TOKEN_CODES.VOID;
      case "string":
        return TOKEN_CODES.STRING;
      case "return":
        return TOKEN_CODES.RETURN;
      case "main":
        return TOKEN_CODES.MAIN;
      case "literal":
        return TOKEN_CODES.LITERAL;
      case "integer":
        return TOKEN_CODES.INTEGER;
      case "inicio":
        return TOKEN_CODES.INICIO;
      case "if":
        return TOKEN_CODES.IF;
      case "for":
        return TOKEN_CODES.FOR;
      case "float":
        return TOKEN_CODES.FLOAT;
      case "fim":
        return TOKEN_CODES.FIM;
      case "else":
        return TOKEN_CODES.ELSE;
      case "do":
        return TOKEN_CODES.DO;
      case "cout":
        return TOKEN_CODES.COUT;
      case "cin":
        return TOKEN_CODES.CIN;
      case "char":
        return TOKEN_CODES.CHAR;
      case "callfuncao":
        return TOKEN_CODES.CALLFUNCAO;
      default:
        return TOKEN_CODES.NOMEVARIAVEL;
    }
  }
}
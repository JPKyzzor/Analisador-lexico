import { MonoState } from "./states/MonoState";
import { StateNomeVariavel } from "./states/1.StateNomeVariavel";
import { StateLiteral } from "./states/11.StateLiteral";
import { StateMaior } from "./states/25-26-27.StateMaior";
import { StateIgual } from "./states/28-29-StateIgual";
import { StateMenor } from "./states/30-31-32.StateMenor";
import { StateMais } from "./states/33-34.StateMais";
import { StateBarra } from "./states/39-100.StateBarra";
import { StateDiferente } from "./states/45.StateDiferente";
import { StateMenos } from "./states/46-47.StateMenos";
import { StateNumero } from "./states/5-6.StateNumeros";
import { StateNomeDoChar } from "./states/8.StateNomeDoChar";
import { StateNomeDaString } from "./states/9.StateNomeDaString";
import { TOKEN_CODES } from "../../shared/enum/TokenCodes.enum";

export interface State {
  process(inputCode: string, index: number): StateResponse;
}

export class StateFactory {
  static create(caracter: string): State | undefined {
    if (/[a-zA-Z_]/.test(caracter)) return new StateNomeVariavel(); //7
    if (/[0-9]/.test(caracter)) return new StateNumero(); //5,6
    if (caracter === "'") return new StateNomeDoChar(); //8
    if (caracter === '"') return new StateNomeDaString(); //9
    if (caracter === "`") return new StateLiteral(); //11
    if (caracter === ">") return new StateMaior(); //25,26,27
    if (caracter === "=") return new StateIgual(); //28, 29
    if (caracter === "<") return new StateMenor(); //30,31,32
    if (caracter === "+") return new StateMais(); //33, 34
    if (caracter === "}") return new MonoState(TOKEN_CODES.FECHA_CHAVE); //35
    if (caracter === "{") return new MonoState(TOKEN_CODES.ABRE_CHAVE); //36
    if (caracter === ";") return new MonoState(TOKEN_CODES.PONTO_E_VIRGULA); //37
    if (caracter === ":") return new MonoState(TOKEN_CODES.DOIS_PONTOS); //38
    if (caracter === "/") return new StateBarra(); //39 e comentario inline e em bloco
    if (caracter === ",") return new MonoState(TOKEN_CODES.VIRGULA); //40
    if (caracter === "*") return new MonoState(TOKEN_CODES.ASTERISCO); //41
    if (caracter === ")") return new MonoState(TOKEN_CODES.FECHA_PARENTESES); //42
    if (caracter === "(") return new MonoState(TOKEN_CODES.ABRE_PARENTESES); //43
    if (caracter === "!") return new StateDiferente(); //45
    if (caracter === "-") return new StateMenos(); //46, 47
    return undefined;
  }
}

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

export type TokenInfo = {
  code: number;
  value: string;
  line?: number;
};

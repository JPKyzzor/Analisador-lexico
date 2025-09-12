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

export interface State {
  process(codigo: string, index: number): StateResponse;
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
    if (caracter === "}") return new MonoState(35); //35
    if (caracter === "{") return new MonoState(36); //36
    if (caracter === ";") return new MonoState(37); //37
    if (caracter === ":") return new MonoState(38); //38
    if (caracter === "/") return new StateBarra(); //39 e comentario inline e em bloco
    if (caracter === ",") return new MonoState(40); //40
    if (caracter === "*") return new MonoState(41); //41
    if (caracter === ")") return new MonoState(42); //42
    if (caracter === "(") return new MonoState(43); //43
    if (caracter === "$") return new MonoState(44); //44
    if (caracter === "!") return new StateDiferente(); //45
    if (caracter === "-") return new StateMenos(); //46, 47
    return undefined;
  }
}

export type StateResponse =
  | {
      success: true;
      analisedCharacters: number;
      tokenInfo: TokenInfo;
    }
  | {
      success: false;
      analisedCharacters: number;
      tokenInfo?: never;
    };

export type TokenInfo = {
  code: number;
  value: string;
}


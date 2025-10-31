"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateNumero = void 0;
const TokenCodes_enum_1 = require("../../enum/TokenCodes.enum");
const BaseState_1 = require("./BaseState");
class StateNumero extends BaseState_1.BaseState {
    process(codigo, index) {
        const start = index;
        let analisedCharacters = 0;
        let hasDot = false;
        // Primeiro caractere já é um número
        analisedCharacters++;
        index++;
        while (codigo[index]) {
            if (/[0-9]/.test(codigo[index])) {
                analisedCharacters++;
                index++;
            }
            else if (!hasDot && codigo[index] === ".") {
                // Permite apenas um ponto
                hasDot = true;
                analisedCharacters++;
                index++;
                // Após o ponto, deve haver pelo menos um número
                if (!/[0-9]/.test(codigo[index])) {
                    return this.fail(analisedCharacters);
                }
            }
            else {
                break;
            }
        }
        const tokenCode = hasDot
            ? TokenCodes_enum_1.TOKEN_CODES.NUMEROFLOAT
            : TokenCodes_enum_1.TOKEN_CODES.NUMEROINTEIRO;
        return this.success(codigo, tokenCode, start, analisedCharacters);
    }
}
exports.StateNumero = StateNumero;

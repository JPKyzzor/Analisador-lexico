"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateNomeDaString = void 0;
const TokenCodes_enum_1 = require("../../enum/TokenCodes.enum");
const BaseState_1 = require("./BaseState");
class StateNomeDaString extends BaseState_1.BaseState {
    process(inputCode, index) {
        const start = index;
        let i = index + 1;
        while (i < inputCode.length && inputCode[i] !== '"') {
            i++;
        }
        if (i >= inputCode.length) {
            return this.fail(i - index);
        }
        const analisedCharacters = i - index + 1;
        return this.success(inputCode, TokenCodes_enum_1.TOKEN_CODES.NOMEDASTRING, start, analisedCharacters); // aceita vazio "" ou conteúdo
    }
}
exports.StateNomeDaString = StateNomeDaString;

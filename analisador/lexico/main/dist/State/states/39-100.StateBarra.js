"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateBarra = void 0;
const TokenCodes_enum_1 = require("../../enum/TokenCodes.enum");
const BaseState_1 = require("./BaseState");
class StateBarra extends BaseState_1.BaseState {
    process(inputCode, index) {
        const nextChar = inputCode[index + 1];
        const start = index;
        // Comentário de linha //
        if (nextChar === "/") {
            let i = index + 2;
            while (i < inputCode.length && inputCode[i] !== "\n") {
                i++;
            }
            const analisedCharacters = i - index;
            return this.success(inputCode, TokenCodes_enum_1.TOKEN_CODES.COMENTARIO, start, analisedCharacters);
        }
        // Comentário de bloco /* ... */
        if (nextChar === "-") {
            let i = index + 2;
            while (i < inputCode.length - 1) {
                if (inputCode[i] === "-" && inputCode[i + 1] === "/") {
                    i += 2;
                    const analisedCharacters = i - index;
                    return this.success(inputCode, TokenCodes_enum_1.TOKEN_CODES.COMENTARIO, start, analisedCharacters);
                }
                i++;
            }
            //não fechou comentario
            return this.fail(inputCode.length - index);
        }
        //operador /
        return this.success(inputCode, TokenCodes_enum_1.TOKEN_CODES.BARRA, start, 1);
    }
}
exports.StateBarra = StateBarra;

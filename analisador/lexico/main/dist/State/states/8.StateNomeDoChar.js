"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateNomeDoChar = void 0;
const TokenCodes_enum_1 = require("../../enum/TokenCodes.enum");
const BaseState_1 = require("./BaseState");
class StateNomeDoChar extends BaseState_1.BaseState {
    process(inputCode, start) {
        if (inputCode[start + 1] === "'") {
            return this.success(inputCode, TokenCodes_enum_1.TOKEN_CODES.NOMEDOCHAR, start, 2);
        }
        if (inputCode[start + 2] === "'") {
            return this.success(inputCode, TokenCodes_enum_1.TOKEN_CODES.NOMEDOCHAR, start, 3);
        }
        return { success: false, analisedCharacters: 3 };
    }
}
exports.StateNomeDoChar = StateNomeDoChar;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateMenor = void 0;
const TokenCodes_enum_1 = require("../../enum/TokenCodes.enum");
const BaseState_1 = require("./BaseState");
class StateMenor extends BaseState_1.BaseState {
    process(inputCode, index) {
        const start = index;
        const nextChar = inputCode[index + 1];
        if (nextChar === "=") {
            return this.success(inputCode, TokenCodes_enum_1.TOKEN_CODES.MENOR_IGUAL, start, 2);
        }
        if (nextChar === "<") {
            return this.success(inputCode, TokenCodes_enum_1.TOKEN_CODES.SHIFT_LEFT, start, 2);
        }
        return this.success(inputCode, TokenCodes_enum_1.TOKEN_CODES.MENOR, start, 1);
    }
}
exports.StateMenor = StateMenor;

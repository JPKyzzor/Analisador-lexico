"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateMaior = void 0;
const TokenCodes_enum_1 = require("../../enum/TokenCodes.enum");
const BaseState_1 = require("./BaseState");
class StateMaior extends BaseState_1.BaseState {
    process(inputCode, index) {
        const nextChar = inputCode[index + 1];
        const start = index;
        if (nextChar === ">") {
            return this.success(inputCode, TokenCodes_enum_1.TOKEN_CODES.SHIFT_RIGHT, start, 2);
        }
        if (nextChar === "=") {
            return this.success(inputCode, TokenCodes_enum_1.TOKEN_CODES.MAIOR_IGUAL, start, 2);
        }
        return this.success(inputCode, TokenCodes_enum_1.TOKEN_CODES.MAIOR, start, 1);
    }
}
exports.StateMaior = StateMaior;

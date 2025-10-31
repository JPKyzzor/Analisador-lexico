"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateMenos = void 0;
const TokenCodes_enum_1 = require("../../enum/TokenCodes.enum");
const BaseState_1 = require("./BaseState");
class StateMenos extends BaseState_1.BaseState {
    process(inputCode, index) {
        const nextChar = inputCode[index + 1];
        const start = index;
        if (nextChar === "-") {
            return this.success(inputCode, TokenCodes_enum_1.TOKEN_CODES.DECREMENTO, start, 2);
        }
        return this.success(inputCode, TokenCodes_enum_1.TOKEN_CODES.MENOS, start, 1);
    }
}
exports.StateMenos = StateMenos;

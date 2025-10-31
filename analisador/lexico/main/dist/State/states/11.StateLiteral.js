"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateLiteral = void 0;
const TokenCodes_enum_1 = require("../../enum/TokenCodes.enum");
const BaseState_1 = require("./BaseState");
class StateLiteral extends BaseState_1.BaseState {
    process(inputCode, index) {
        const start = index;
        let i = index + 1;
        while (i < inputCode.length && inputCode[i] !== "`") {
            i++;
        }
        if (i >= inputCode.length) {
            return this.fail(i - index);
        }
        return this.success(inputCode, TokenCodes_enum_1.TOKEN_CODES.LITERAL, start, i - index + 1);
    }
}
exports.StateLiteral = StateLiteral;

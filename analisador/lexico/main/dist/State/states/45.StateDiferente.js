"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateDiferente = void 0;
const TokenCodes_enum_1 = require("../../enum/TokenCodes.enum");
const BaseState_1 = require("./BaseState");
class StateDiferente extends BaseState_1.BaseState {
    process(inputCode, index) {
        const nextChar = inputCode[index + 1];
        const start = index;
        if (nextChar === "=") {
            return this.success(inputCode, TokenCodes_enum_1.TOKEN_CODES.DIFERENTE, start, 2);
        }
        return this.fail(1);
    }
}
exports.StateDiferente = StateDiferente;

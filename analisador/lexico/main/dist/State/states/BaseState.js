"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseState = void 0;
class BaseState {
    success(inputCode, tokenCode, startIndex, analisedCharacters) {
        const tokenInfo = {
            code: tokenCode,
            value: inputCode.slice(startIndex, startIndex + analisedCharacters),
        };
        return {
            success: true,
            analisedCharacters,
            tokenInfo,
        };
    }
    fail(analisedCharacters) {
        return {
            success: false,
            analisedCharacters,
        };
    }
}
exports.BaseState = BaseState;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateNomeVariavel = void 0;
const TokenCodes_enum_1 = require("../../enum/TokenCodes.enum");
const BaseState_1 = require("./BaseState");
class StateNomeVariavel extends BaseState_1.BaseState {
    process(inputCode, index) {
        const start = index;
        let analisedCharacters = 0;
        if (!inputCode[index].match(/[a-z]/)) {
            return { success: false, analisedCharacters: 1 };
        }
        analisedCharacters++;
        index++;
        // Pode seguir com letras (maiusculas/minusculas), números ou _
        while (inputCode[index] && inputCode[index].match(/[a-zA-Z0-9_]/)) {
            analisedCharacters++;
            index++;
        }
        const value = inputCode.slice(start, start + analisedCharacters);
        const tokenCode = this.getTokenByText(value);
        return this.success(inputCode, tokenCode, start, analisedCharacters);
    }
    getTokenByText(value) {
        switch (value) {
            case "while":
                return TokenCodes_enum_1.TOKEN_CODES.WHILE;
            case "void":
                return TokenCodes_enum_1.TOKEN_CODES.VOID;
            case "string":
                return TokenCodes_enum_1.TOKEN_CODES.STRING;
            case "return":
                return TokenCodes_enum_1.TOKEN_CODES.RETURN;
            case "main":
                return TokenCodes_enum_1.TOKEN_CODES.MAIN;
            case "literal":
                return TokenCodes_enum_1.TOKEN_CODES.LITERAL;
            case "integer":
                return TokenCodes_enum_1.TOKEN_CODES.INTEGER;
            case "inicio":
                return TokenCodes_enum_1.TOKEN_CODES.INICIO;
            case "if":
                return TokenCodes_enum_1.TOKEN_CODES.IF;
            case "for":
                return TokenCodes_enum_1.TOKEN_CODES.FOR;
            case "float":
                return TokenCodes_enum_1.TOKEN_CODES.FLOAT;
            case "fim":
                return TokenCodes_enum_1.TOKEN_CODES.FIM;
            case "else":
                return TokenCodes_enum_1.TOKEN_CODES.ELSE;
            case "do":
                return TokenCodes_enum_1.TOKEN_CODES.DO;
            case "cout":
                return TokenCodes_enum_1.TOKEN_CODES.COUT;
            case "cin":
                return TokenCodes_enum_1.TOKEN_CODES.CIN;
            case "char":
                return TokenCodes_enum_1.TOKEN_CODES.CHAR;
            case "callfuncao":
                return TokenCodes_enum_1.TOKEN_CODES.CALLFUNCAO;
            default:
                return TokenCodes_enum_1.TOKEN_CODES.NOMEVARIAVEL;
        }
    }
}
exports.StateNomeVariavel = StateNomeVariavel;

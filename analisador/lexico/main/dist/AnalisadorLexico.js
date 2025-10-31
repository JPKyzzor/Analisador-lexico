"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalisadorLexico = void 0;
const fs = __importStar(require("fs"));
const StateFactory_1 = require("./State/StateFactory");
class AnalisadorLexico {
    constructor(filePath) {
        this.line = 1;
        this.column = 1;
        this.index = 0;
        if (!fs.existsSync(filePath)) {
            throw new Error(`Arquivo não encontrado: ${filePath}`);
        }
        this.codigo = fs.readFileSync(filePath, "utf8");
    }
    Execute() {
        const tokenArray = [];
        this.index = 0;
        this.column = 1;
        this.line = 1;
        while (this.hasText()) {
            const char = this.codigo[this.index];
            if (this.isEndOfLineCheck(char))
                continue;
            if (this.isWhitespaceCheck(char))
                continue;
            const state = StateFactory_1.StateFactory.create(char);
            if (!state) {
                this.handleUnknownCharacter(char);
                return tokenArray; // retorna até onde conseguiu
            }
            const response = state.process(this.codigo, this.index);
            if (!response.success) {
                this.handleLexicalError(this.line, this.column, response.analisedCharacters);
                return tokenArray; // retorna até onde conseguiu
            }
            this.index += response.analisedCharacters;
            this.column += response.analisedCharacters;
            if (response.tokenInfo) {
                tokenArray.push(response.tokenInfo);
            }
        }
        this.handleValidationSuccess();
        return tokenArray;
    }
    isEndOfLineCheck(char) {
        const isEndOfLine = char === "\n";
        if (isEndOfLine) {
            this.index++;
            this.line++;
            this.column = 1;
        }
        return isEndOfLine;
    }
    hasText() {
        return this.index < this.codigo.length;
    }
    isWhitespaceCheck(char) {
        const isWhitespace = /\s/.test(char);
        if (isWhitespace) {
            this.index++;
            this.column++;
        }
        return isWhitespace;
    }
    handleUnknownCharacter(char) {
        console.log(`❌ Caracter não reconhecido '${char}' na linha ${this.line}, caracter ${this.column}`);
    }
    handleLexicalError(line, column, length) {
        console.log(`❌ Erro léxico na linha ${line}, caracter ${column} até caracter ${column + length}`);
    }
    handleValidationSuccess() {
        console.log("✅ Código validado com sucesso.");
    }
}
exports.AnalisadorLexico = AnalisadorLexico;

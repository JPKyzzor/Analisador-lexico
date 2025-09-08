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
const StateFactory_1 = require("./StateFactory");
class AnalisadorLexico {
    constructor(filePath) {
        this.line = 1;
        this.column = 1;
        if (!fs.existsSync(filePath)) {
            throw new Error(`Arquivo não encontrado: ${filePath}`);
        }
        this.codigo = fs.readFileSync(filePath, "utf8");
    }
    Execute() {
        let index = 0;
        while (index < this.codigo.length) {
            const char = this.codigo[index];
            // Nova linha → atualiza linha/coluna
            if (char === "\n") {
                this.line++;
                this.column = 1;
                index++;
                continue;
            }
            // Espaço, tabulação etc.
            if (this.isWhitespace(char)) {
                index++;
                this.column++;
                continue;
            }
            const state = StateFactory_1.StateFactory.create(char);
            if (!state) {
                this.handleUnknownCharacter(char);
                return;
            }
            const response = state.process(this.codigo, index);
            if (!response.success) {
                this.handleLexicalError(this.line, this.column, response.analisedCharacters);
                return;
            }
            // Avança índices
            index += response.analisedCharacters;
            this.column += response.analisedCharacters;
        }
        this.handleValidationSuccess();
    }
    isWhitespace(char) {
        return /\s/.test(char);
    }
    handleUnknownCharacter(char) {
        console.log(`❌ Caracter não reconhecido '${char}' na linha ${this.line}, coluna ${this.column}`);
    }
    handleLexicalError(line, column, length) {
        console.log(`❌ Erro léxico na linha ${line}, coluna ${column} até coluna ${column + length}`);
    }
    handleValidationSuccess() {
        console.log("✅ Código validado com sucesso.");
    }
}
exports.AnalisadorLexico = AnalisadorLexico;

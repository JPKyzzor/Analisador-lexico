"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateFactory = void 0;
const MonoState_1 = require("./states/MonoState");
const _1_StateNomeVariavel_1 = require("./states/1.StateNomeVariavel");
const _11_StateLiteral_1 = require("./states/11.StateLiteral");
const _25_26_27_StateMaior_1 = require("./states/25-26-27.StateMaior");
const _28_29_StateIgual_1 = require("./states/28-29-StateIgual");
const _30_31_32_StateMenor_1 = require("./states/30-31-32.StateMenor");
const _33_34_StateMais_1 = require("./states/33-34.StateMais");
const _39_100_StateBarra_1 = require("./states/39-100.StateBarra");
const _45_StateDiferente_1 = require("./states/45.StateDiferente");
const _46_47_StateMenos_1 = require("./states/46-47.StateMenos");
const _5_6_StateNumeros_1 = require("./states/5-6.StateNumeros");
const _8_StateNomeDoChar_1 = require("./states/8.StateNomeDoChar");
const _9_StateNomeDaString_1 = require("./states/9.StateNomeDaString");
class StateFactory {
    static create(caracter) {
        if (/[a-zA-Z_]/.test(caracter))
            return new _1_StateNomeVariavel_1.StateNomeVariavel(); //7
        if (/[0-9]/.test(caracter))
            return new _5_6_StateNumeros_1.StateNumero(); //5,6
        if (caracter === "'")
            return new _8_StateNomeDoChar_1.StateNomeDoChar(); //8
        if (caracter === '"')
            return new _9_StateNomeDaString_1.StateNomeDaString(); //9
        if (caracter === "`")
            return new _11_StateLiteral_1.StateLiteral(); //11
        if (caracter === ">")
            return new _25_26_27_StateMaior_1.StateMaior(); //25,26,27
        if (caracter === "=")
            return new _28_29_StateIgual_1.StateIgual(); //28, 29
        if (caracter === "<")
            return new _30_31_32_StateMenor_1.StateMenor(); //30,31,32
        if (caracter === "+")
            return new _33_34_StateMais_1.StateMais(); //33, 34
        if (caracter === "}")
            return new MonoState_1.MonoState(35); //35
        if (caracter === "{")
            return new MonoState_1.MonoState(36); //36
        if (caracter === ";")
            return new MonoState_1.MonoState(37); //37
        if (caracter === ":")
            return new MonoState_1.MonoState(38); //38
        if (caracter === "/")
            return new _39_100_StateBarra_1.StateBarra(); //39 e comentario inline e em bloco
        if (caracter === ",")
            return new MonoState_1.MonoState(40); //40
        if (caracter === "*")
            return new MonoState_1.MonoState(41); //41
        if (caracter === ")")
            return new MonoState_1.MonoState(42); //42
        if (caracter === "(")
            return new MonoState_1.MonoState(43); //43
        if (caracter === "$")
            return new MonoState_1.MonoState(44); //44
        if (caracter === "!")
            return new _45_StateDiferente_1.StateDiferente(); //45
        if (caracter === "-")
            return new _46_47_StateMenos_1.StateMenos(); //46, 47
        return undefined;
    }
}
exports.StateFactory = StateFactory;

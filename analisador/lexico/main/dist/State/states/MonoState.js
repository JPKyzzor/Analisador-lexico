"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonoState = void 0;
const BaseState_1 = require("./BaseState");
class MonoState extends BaseState_1.BaseState {
    constructor(tokenCode) {
        super();
        this.tokenCode = tokenCode;
    }
    process(codigo, index) {
        return this.success(codigo, this.tokenCode, index, 1);
    }
}
exports.MonoState = MonoState;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AnalisadorLexico_1 = require("./AnalisadorLexico");
const analisador = new AnalisadorLexico_1.AnalisadorLexico("./codigoTeste.txt");
analisador.Execute();

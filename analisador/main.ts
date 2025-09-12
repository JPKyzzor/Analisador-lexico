import { AnalisadorLexico } from "./AnalisadorLexico";
import * as fs from "fs";
import * as path from "path";

const inputPath = path.join(__dirname, "assets", "input.txt");
const outputPath = path.join(__dirname, "assets", "output.txt");

const analisador = new AnalisadorLexico(inputPath);
const tokens = analisador.Execute();

// Monta o output (códigos separados por espaço)
const output = tokens.map(token => token.code).join(" ");

// Escreve no arquivo
fs.writeFileSync(outputPath, output, "utf8");
console.log(`✅ Output salvo em: ${outputPath}`);

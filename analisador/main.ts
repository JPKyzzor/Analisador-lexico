import { AnalisadorLexico } from "./AnalisadorLexico";
import * as fs from "fs";
import * as path from "path";

const inputPath = path.join(__dirname, "assets", "input.txt");
const outputPath = path.join(__dirname, "assets", "output.txt");

const analisador = new AnalisadorLexico(inputPath);
const analisadorOutput = analisador.Execute();
console.log(analisadorOutput.tokens);

// Monta o output (códigos separados por espaço)
let outputString: string;

if (!analisadorOutput.errorMessage) {
  console.log("✅ Código validado com sucesso.");
  outputString = analisadorOutput.tokens
  .map((token) => `${token.code} ${token.value} ${token.line}`)
  .join("\n");
  fs.writeFileSync(outputPath, outputString, "utf8");
} else {
  console.log(analisadorOutput.errorMessage)
  outputString = analisadorOutput.errorMessage;
}
fs.writeFileSync(outputPath, outputString, "utf8");

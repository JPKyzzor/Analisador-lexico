import { AnalisadorLexico } from "./lexico/AnalisadorLexico";
import * as fs from "fs";
import * as path from "path";
import { TokenInfo } from "./lexico/State/StateFactory";
import { AnalisadorSintatico } from "./sintatico/AnalisadorSintatico";

const exemplo1Path = path.join(__dirname, "assets", "exemplo1", "input.txt");
const exemplo2Path = path.join(__dirname, "assets", "exemplo2", "input.txt");
const exemplo3Path = path.join(__dirname, "assets", "exemplo3", "input.txt");

const exemplo1OutputPath = path.join(__dirname, "assets", "exemplo1", "output.txt");
const exemplo2OutputPath = path.join(__dirname, "assets", "exemplo2", "output.txt");
const exemplo3OutputPath = path.join(__dirname, "assets", "exemplo3", "output.txt");

const exemplos = [exemplo1Path, exemplo2Path, exemplo3Path];
const exemplosOutputs = [exemplo1OutputPath, exemplo2OutputPath, exemplo3OutputPath];

for (let i = 0; i < exemplos.length; i++) {
  const inputPath = exemplos[i];
  const outputPath = exemplosOutputs[i];

  console.log(`\n\nAnalisando Exemplo ${i+1}...`);

  try {
    const analisadorLexico = new AnalisadorLexico(inputPath);
    const tokens = analisadorLexico.Execute();
    let output = mountOutputString(tokens);

    try {
      const analisadorSintatico = new AnalisadorSintatico(tokens);
      analisadorSintatico.Execute();
      output += `\n\nCódigo passou pelo analisador sintático sem erros.`;
    } catch (sintaticoError: any) {
      output += `\n\nErro sintático: ${sintaticoError?.message ?? sintaticoError}`;
      console.error("Erro sintático:", sintaticoError?.message);
    }

    fs.writeFileSync(outputPath, output, "utf8");
  } catch (lexicoError: any) {
    const message = lexicoError?.message ?? JSON.stringify(lexicoError);
    fs.writeFileSync(exemplosOutputs[i], `Erro léxico: ${message}`, "utf8");
    console.error("Erro léxico:", message);
  }
}

function mountOutputString(tokens: TokenInfo[]): string {
  return tokens
    .map((t) => {
      const parts = [`${t.code}`, t.value];
      if (t.line !== undefined) parts.push(`linha ${t.line}`);
      return parts.join(" ");
    })
    .join("\n");
}

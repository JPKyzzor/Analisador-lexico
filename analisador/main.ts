import { AnalisadorLexico } from "./AnalisadorLexico";
import * as fs from "fs";
import * as path from "path";
import { TokenInfo } from "./State/StateFactory";

const inputPath = path.join(__dirname, "assets", "input.txt");
const outputPath = path.join(__dirname, "assets", "output.txt");
const exemplo1Path = path.join(__dirname, "assets", "exemplo1.txt");
const exemplo2Path = path.join(__dirname, "assets", "exemplo2.txt");
const exemplo3Path = path.join(__dirname, "assets", "exemplo3.txt");
const exemplo1OutputPath = path.join(__dirname, "assets", "exemplo1Output.txt");
const exemplo2OutputPath = path.join(__dirname, "assets", "exemplo2Output.txt");
const exemplo3OutputPath = path.join(__dirname, "assets", "exemplo3Output.txt");

const exemplos = [exemplo1Path, exemplo2Path, exemplo3Path];
const exemplosOutputs = [
  exemplo1OutputPath,
  exemplo2OutputPath,
  exemplo3OutputPath,
];

for (let i = 0; i < 3; i++) {
  const analisador = new AnalisadorLexico(exemplos[i]);

  try {
    const tokens = analisador.Execute();
    fs.writeFileSync(exemplosOutputs[i], mountOutputString(tokens), "utf8");
  } catch (e: any) {
    console.log(e?.message);
    if (e instanceof Error) {
      fs.writeFileSync(exemplosOutputs[i], e.message, "utf8");
    } else {
      fs.writeFileSync(exemplosOutputs[i], JSON.stringify(e), "utf8");
    }
  }
}

function mountOutputString(tokens: TokenInfo[]): string {
  return tokens
    .map((t) => {
      const parts = [`${t.code}`, t.value];
      if (t.line !== undefined) {
        parts.push(`linha ${t.line}`);
      }
      return parts.join(" ");
    })
    .join("\n");
}

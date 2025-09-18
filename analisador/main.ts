import { AnalisadorLexico } from "./AnalisadorLexico";
import * as fs from "fs";
import * as path from "path";
import { TokenInfo } from "./State/StateFactory";

const inputPath = path.join(__dirname, "assets", "input.txt");
const outputPath = path.join(__dirname, "assets", "output.txt");

const analisador = new AnalisadorLexico(inputPath);

try {
  const tokens = analisador.Execute();
  fs.writeFileSync(outputPath, mountOutputString(tokens), "utf8");
} catch (e: any) {
  console.log(e?.message)
  if (e instanceof Error) {
    fs.writeFileSync(outputPath, e.message, "utf8");
  } else {
    fs.writeFileSync(outputPath, JSON.stringify(e), "utf8");
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



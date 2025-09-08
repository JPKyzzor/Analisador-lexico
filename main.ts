import { AnalisadorLexico } from "./AnalisadorLexico";


const codigo: string = `
  teste teste teste 123.3
`;

const analisador = new AnalisadorLexico(codigo);
analisador.Execute()
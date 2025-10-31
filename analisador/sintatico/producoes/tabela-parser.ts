import { Producao, Producao1, Producao15 } from "./producoes";

export class TabelaParser{


  EncontrarProducao(topoDaPilha: number, tokenASerValidado:number): Producao{
    // Vou garantir que nessa função, o topo da pilha sempre vai ser um não-terminal
    topoDaPilha = 57;

    // Token a ser validado vai ser sempre terminal
    tokenASerValidado = 2;

    //Buscar na tabela de parser a combinação dos dois, caso não encontre, joga um Throw New Error, se encontrar retorna a producao
    return new Producao1();
  }
}
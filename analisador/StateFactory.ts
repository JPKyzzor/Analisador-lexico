export interface State {
  process(codigo: string, index: number): StateResponse;
}

interface StateResponse {
  success: boolean;
  analisedCharacters: number;
}

export class StateFactory {
  static create(caracter: string): State | undefined {
    //Por enquanto, o state de variaveis já faz o trabalho de palavras reservadas, vamos usar isso depois
    //if (/[a-z]/.test(caracter)) return new StatePalavrasReservadas(); //1,2,3,4,10,12,13,14,16,17,18,19,20,21,22,23,24
    if (/[0-9]/.test(caracter)) return new StateNumero(); //5,6
    if (/[a-zA-Z_]/.test(caracter)) return new StateNomeVariavel(); //7
    if (caracter === "'") return new StateNomeDoChar(); //8
    if (caracter === '"') return new StateNomeDaString(); //9
    if (caracter === "`") return new StateLiteral(); //11
    if (caracter === ">") return new StateMaior(); //25,26,27
    if (caracter === "=") return new StateIgual(); //28, 29
    if (caracter === "<") return new StateMenor(); //30,31,32
    if (caracter === "+") return new StateMais(); //33, 34
    if (caracter === "}") return new MonoState(); //35
    if (caracter === "{") return new MonoState(); //36
    if (caracter === ";") return new MonoState(); //37
    if (caracter === ":") return new MonoState(); //38
    if (caracter === "/") return new StateBarra(); //39 e comentario inline e em bloco
    if (caracter === ",") return new MonoState(); //40
    if (caracter === "*") return new MonoState(); //41
    if (caracter === ")") return new MonoState(); //42
    if (caracter === "(") return new MonoState(); //43
    if (caracter === "$") return new MonoState(); //44
    if (caracter === "!") return new StateDiferente(); //45
    if (caracter === "-") return new StateMenos(); //46, 47
    return undefined;
  }
}

class MonoState implements State {
  process(codigo: string, index: number): StateResponse {
    return { success: true, analisedCharacters: 1 };
  }
}

class StatePalavrasReservadas implements State {
  process(codigo: string, index: number): StateResponse {
    let analisedCharacters = 0;
    //enquanto for letras minusculas
    while (codigo[index] && codigo[index].match(/[a-z]/)) {
      analisedCharacters++;
      index++;
    }
    return {
      analisedCharacters: analisedCharacters,
      success: true,
    };
  }
}

class StateNomeVariavel implements State {
  process(codigo: string, index: number): StateResponse {
    let analisedCharacters = 0;

    if (!codigo[index].match(/[a-z]/)) {
      return { success: false, analisedCharacters: 1 };
    }

    analisedCharacters++;
    index++;

    // Pode seguir com letras (maiusculas/minusculas), números ou _
    while (codigo[index] && codigo[index].match(/[a-zA-Z0-9_]/)) {
      analisedCharacters++;
      index++;
    }

    return {
      success: true,
      analisedCharacters,
    };
  }
}

class StateNumero implements State {
  process(codigo: string, index: number): StateResponse {
    let analisedCharacters = 0;
    let hasDot = false;

    // Primeiro caractere já é um número
    analisedCharacters++;
    index++;

    while (codigo[index]) {
      if (/[0-9]/.test(codigo[index])) {
        analisedCharacters++;
        index++;
      } else if (!hasDot && codigo[index] === ".") {
        // Permite apenas um ponto
        hasDot = true;
        analisedCharacters++;
        index++;
        // Após o ponto, deve haver pelo menos um número
        if (!/[0-9]/.test(codigo[index])) {
          return { success: false, analisedCharacters };
        }
      } else {
        break;
      }
    }

    return {
      success: true,
      analisedCharacters,
    };
  }
}

class StateNomeDoChar implements State {
  process(codigo: string, index: number): StateResponse {
    if (codigo[index + 1] === "'") {
      return { success: true, analisedCharacters: 2 };
    }
    if (codigo[index + 2] === "'") {
      return { success: true, analisedCharacters: 3 };
    }
    return { success: false, analisedCharacters: 3 };
  }
}

class StateLiteral implements State {
  process(codigo: string, index: number) {
    let i = index + 1;
    while (i < codigo.length && codigo[i] !== "`") {
      i++;
    }

    if (i >= codigo.length) {
      return { success: false, analisedCharacters: i - index };
    }

    return { success: true, analisedCharacters: i - index + 1 };
  }
}

class StateNomeDaString implements State {
  process(codigo: string, index: number) {
    let i = index + 1;
    while (i < codigo.length && codigo[i] !== '"') {
      i++;
    }

    if (i >= codigo.length) {
      return { success: false, analisedCharacters: i - index };
    }

    return { success: true, analisedCharacters: i - index + 1 }; // aceita vazio "" ou conteúdo
  }
}

class StateMaior implements State {
  process(codigo: string, index: number): StateResponse {
    const nextChar = codigo[index + 1];
    if (nextChar === ">") {
      return { analisedCharacters: 2, success: true };
    }
    if (nextChar === "=") {
      return { analisedCharacters: 2, success: true };
    }
    return { analisedCharacters: 1, success: true };
  }
}

class StateMenor implements State {
  process(codigo: string, index: number): StateResponse {
    const nextChar = codigo[index + 1];
    if (nextChar === "<") {
      return { analisedCharacters: 2, success: true };
    }
    if (nextChar === "=") {
      return { analisedCharacters: 2, success: true };
    }
    return { analisedCharacters: 1, success: true };
  }
}

class StateIgual implements State {
  process(codigo: string, index: number): StateResponse {
    const nextChar = codigo[index + 1];
    if (nextChar === "=") {
      return { analisedCharacters: 2, success: true };
    }
    return { analisedCharacters: 1, success: true };
  }
}

class StateMais implements State {
  process(codigo: string, index: number): StateResponse {
    const nextChar = codigo[index + 1];
    if (nextChar === "+") {
      return { analisedCharacters: 2, success: true };
    }
    return { analisedCharacters: 1, success: true };
  }
}

class StateMenos implements State {
  process(codigo: string, index: number): StateResponse {
    const nextChar = codigo[index + 1];
    if (nextChar === "-") {
      return { analisedCharacters: 2, success: true };
    }
    return { analisedCharacters: 1, success: true };
  }
}

class StateDiferente implements State {
  process(codigo: string, index: number): StateResponse {
    const nextChar = codigo[index + 1];
    if (nextChar === "=") {
      return { analisedCharacters: 2, success: true };
    }
    return { analisedCharacters: 2, success: false };
  }
}
class StateBarra implements State {
  process(codigo: string, index: number): StateResponse {
    const nextChar = codigo[index + 1];

    // Comentário de linha //
    if (nextChar === "/") {
      let i = index + 2;
      while (i < codigo.length && codigo[i] !== "\n") {
        i++;
      }
      return { success: true, analisedCharacters: i - index };
    }

    // Comentário de bloco /* ... */
    if (nextChar === "-") {
      let i = index + 2;
      while (i < codigo.length - 1) {
        if (codigo[i] === "-" && codigo[i + 1] === "/") {
          i += 2;
          return { success: true, analisedCharacters: i - index };
        }
        i++;
      }
      //não fechou comentario
      return { success: false, analisedCharacters: codigo.length - index };
    }

    //operador
    return { success: true, analisedCharacters: 1 };
  }
}

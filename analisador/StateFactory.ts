export interface State {
  process(codigo: string, index: number): StateResponse;
}

interface StateResponse {
  success: boolean;
  analisedCharacters: number;
}

export class StateFactory {
  static create(caracter: string): State | undefined {
    if (/[a-z]/.test(caracter)) return new StatePalavrasReservadas();
    if (/[a-zA-Z_]/.test(caracter)) return new StateNomeVariavel();
    if (/[0-9]/.test(caracter)) return new StateNumero();
    if (caracter === "'") return new StateNomeDoChar();
    if (caracter === "`") return new StateLiteral();
    if (caracter === '"') return new StateNomeDaString();
    if (caracter === ">") return new StateMaior();
    return undefined;
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

export interface State {
  process(codigo: string, index: number): StateResponse;
}

interface StateResponse {
  success: boolean;
  analisedCharacters: number;
}

export class StateFactory {
  static create(caracter: string): State | undefined {
    if (/[a-z]/.test(caracter)) return new NoPalavrasReservadas();
    if (/[a-zA-Z_]/.test(caracter)) return new NoNomeVariavel();
    if (/[0-9]/.test(caracter)) return new NoNumero();
    return undefined;
  }
}

class NoPalavrasReservadas implements State {
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

class NoNomeVariavel implements State {
  process(codigo: string, index: number): StateResponse {
    let analisedCharacters = 0;

    if (!codigo[index].match(/[a-z]/)) {
      return { success: false, analisedCharacters: 1 };
    }

    analisedCharacters++;
    index++;

    // Pode seguir com letras (maiusculas/minusculas), números ou _
    while (
      codigo[index] &&
      codigo[index].match(/[a-zA-Z0-9_]/)
    ) {
      analisedCharacters++;
      index++;
    }

    return {
      success: true,
      analisedCharacters,
    };
  }
}

class NoNumero implements State {
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
export enum TipoAnalisadorEnum {
  MAIN = "[MAIN]",
  LEXICO = "[Léxico]",
  SINTATICO = "[Sintático]",
  SEMANTICO = "[Semântico]",
}

export class Logger {
  public static info(
    tipoAnalisador: TipoAnalisadorEnum,
    message: string
  ): void {
    console.log(`ℹ️  ${tipoAnalisador} ${message}`);
  }

  public static success(
    tipoAnalisador: TipoAnalisadorEnum,
    message: string
  ): void {
    console.log(`✅ ${tipoAnalisador} ${message}`);
  }

  public static error(
    tipoAnalisador: TipoAnalisadorEnum,
    message: string
  ): void {
    console.log(`❌ ${tipoAnalisador} ${message}`);
  }
}

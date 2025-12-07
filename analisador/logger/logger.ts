export enum TipoAnalisadorEnum {
  MAIN = "[MAIN]",
  LEXICO = "[Léxico]",
  SINTATICO = "[Sintático]",
  SEMANTICO = "[Semântico]",
}

export class Logger {
  private static logs: string[] = [];

  public static info(
    tipoAnalisador: TipoAnalisadorEnum,
    message: string
  ): void {
    const logMessage = `ℹ️  ${tipoAnalisador} ${message}`;
    console.log(logMessage);
    this.logs.push(logMessage);
  }

  public static success(
    tipoAnalisador: TipoAnalisadorEnum,
    message: string
  ): void {
    const logMessage = `✅ ${tipoAnalisador} ${message}`;
    console.log(logMessage);
    this.logs.push(logMessage);
  }

  public static error(
    tipoAnalisador: TipoAnalisadorEnum,
    message: string
  ): void {
    const logMessage = `❌ ${tipoAnalisador} ${message}`;
    console.log(logMessage);
    this.logs.push(logMessage);
  }

  public static getLogs(): string[] {
    return [...this.logs];
  }

  public static clearLogs(): void {
    this.logs = [];
  }

  public static getLogsAsString(): string {
    return this.logs.join("\n");
  }
}

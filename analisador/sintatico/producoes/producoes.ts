export interface Producao {
  code: number;
  tokens: number[];
}

// BLOCO
export class Producao1 implements Producao { code = 1; tokens = [2, 10, 36, 49, 50, 51, 35]; }

// DCLVAR
export class Producao2 implements Producao { code = 2; tokens = [7, 52, 38, 53, 37, 54]; }
export class Producao3 implements Producao { code = 3; tokens = [15]; }

// REPIDENT
export class Producao4 implements Producao { code = 4; tokens = [15]; }
export class Producao5 implements Producao { code = 5; tokens = [40, 7, 52]; }

// TIPO
export class Producao6 implements Producao { code = 6; tokens = [12]; }
export class Producao7 implements Producao { code = 7; tokens = [17]; }
export class Producao8 implements Producao { code = 8; tokens = [3]; }
export class Producao9 implements Producao { code = 9; tokens = [23]; }

// LDVAR
export class Producao10 implements Producao { code = 10; tokens = [56, 38, 53, 37, 54]; }
export class Producao11 implements Producao { code = 11; tokens = [15]; }

// LID
export class Producao12 implements Producao { code = 12; tokens = [7, 52]; }

// DCLFUNC
export class Producao13 implements Producao { code = 13; tokens = [57, 7, 58, 36, 49, 50, 51, 4, 43, 59, 42, 35, 50]; }
export class Producao19 implements Producao { code = 19; tokens = [15]; }

// TIPO_RETORNO
export class Producao14 implements Producao { code = 14; tokens = [12]; }
export class Producao15 implements Producao { code = 15; tokens = [2]; }
export class Producao16 implements Producao { code = 16; tokens = [23]; }
export class Producao17 implements Producao { code = 17; tokens = [17]; }
export class Producao18 implements Producao { code = 18; tokens = [3]; }

// VALORRETORNO
export class Producao20 implements Producao { code = 20; tokens = [5]; }
export class Producao21 implements Producao { code = 21; tokens = [6]; }
export class Producao22 implements Producao { code = 22; tokens = [7]; }
export class Producao23 implements Producao { code = 23; tokens = [8]; }
export class Producao24 implements Producao { code = 24; tokens = [9]; }
export class Producao25 implements Producao { code = 25; tokens = [15]; }

// DEFPAR
export class Producao26 implements Producao { code = 26; tokens = [15]; }
export class Producao27 implements Producao { code = 27; tokens = [43, 60, 42]; }

// PARAM / LPARAM
export class Producao28 implements Producao { code = 28; tokens = [53, 7, 61]; }
export class Producao29 implements Producao { code = 29; tokens = [37, 53, 7, 61]; }
export class Producao30 implements Producao { code = 30; tokens = [15]; }

// CORPO / REPCOMANDO
export class Producao31 implements Producao { code = 31; tokens = [13, 62, 37, 63, 18]; }
export class Producao32 implements Producao { code = 32; tokens = [15]; }
export class Producao33 implements Producao { code = 33; tokens = [62, 37, 63]; }

// COMANDO
export class Producao34 implements Producao { code = 34; tokens = [7, 29, 64]; }
export class Producao35 implements Producao { code = 35; tokens = [9, 29, 64]; }
export class Producao36 implements Producao { code = 36; tokens = [8, 29, 64]; }
export class Producao37 implements Producao { code = 37; tokens = [15]; }
export class Producao38 implements Producao { code = 38; tokens = [24, 7, 65]; }
export class Producao48 implements Producao { code = 48; tokens = [14, 43, 7, 68, 42, 36, 62, 37, 63, 35, 69]; }
export class Producao51 implements Producao { code = 51; tokens = [1, 43, 7, 68, 42, 36, 62, 37, 63, 35]; }
export class Producao63 implements Producao { code = 63; tokens = [16, 43, 7, 29, 70, 37, 7, 68, 37, 71, 42, 36, 62, 37, 63, 35]; }
export class Producao66 implements Producao { code = 66; tokens = [20, 36, 62, 37, 63, 35, 1, 43, 7, 68, 42]; }
export class Producao67 implements Producao { code = 67; tokens = [22, 25, 7]; }
export class Producao68 implements Producao { code = 68; tokens = [21, 31, 11, 72]; }

// PARAMETROS / REPPAR / TPARAM
export class Producao39 implements Producao { code = 39; tokens = [15]; }
export class Producao40 implements Producao { code = 40; tokens = [43, 66, 67, 42]; }
export class Producao41 implements Producao { code = 41; tokens = [15]; }
export class Producao42 implements Producao { code = 42; tokens = [40, 66, 67]; }
export class Producao43 implements Producao { code = 43; tokens = [5]; }
export class Producao44 implements Producao { code = 44; tokens = [9]; }
export class Producao45 implements Producao { code = 45; tokens = [6]; }
export class Producao46 implements Producao { code = 46; tokens = [8]; }
export class Producao47 implements Producao { code = 47; tokens = [7]; }

// ELSEPARTE
export class Producao49 implements Producao { code = 49; tokens = [19, 36, 62, 37, 63, 35]; }
export class Producao50 implements Producao { code = 50; tokens = [15]; }

// COMPARACAO / CONTCOMPARACAO
export class Producao52 implements Producao { code = 52; tokens = [28, 70]; }
export class Producao53 implements Producao { code = 53; tokens = [45, 70]; }
export class Producao54 implements Producao { code = 54; tokens = [27, 70]; }
export class Producao55 implements Producao { code = 55; tokens = [26, 70]; }
export class Producao56 implements Producao { code = 56; tokens = [32, 70]; }
export class Producao57 implements Producao { code = 57; tokens = [30, 70]; }
export class Producao58 implements Producao { code = 58; tokens = [5]; }
export class Producao59 implements Producao { code = 59; tokens = [6]; }
export class Producao60 implements Producao { code = 60; tokens = [9]; }
export class Producao61 implements Producao { code = 61; tokens = [8]; }
export class Producao62 implements Producao { code = 62; tokens = [7]; }

// INCREMENTO
export class Producao64 implements Producao { code = 64; tokens = [33, 5]; }
export class Producao65 implements Producao { code = 65; tokens = [46, 5]; }

// SEQCOUT / SEQUENCIA
export class Producao69 implements Producao { code = 69; tokens = [15]; }
export class Producao70 implements Producao { code = 70; tokens = [31, 7, 73, 72]; }
export class Producao71 implements Producao { code = 71; tokens = [15]; }
export class Producao72 implements Producao { code = 72; tokens = [40, 7, 73]; }

// EXPRESSAO / REPEXP / TERMO / REPTERMO / FATOR
export class Producao73 implements Producao { code = 73; tokens = [76, 77]; }
export class Producao74 implements Producao { code = 74; tokens = [24, 7, 65]; }
export class Producao75 implements Producao { code = 75; tokens = [34, 76, 77]; }
export class Producao76 implements Producao { code = 76; tokens = [47, 76, 77]; }
export class Producao77 implements Producao { code = 77; tokens = [15]; }
export class Producao78 implements Producao { code = 78; tokens = [78, 79]; }
export class Producao79 implements Producao { code = 79; tokens = [15]; }
export class Producao80 implements Producao { code = 80; tokens = [41, 78, 79]; }
export class Producao81 implements Producao { code = 81; tokens = [39, 78, 79]; }
export class Producao82 implements Producao { code = 82; tokens = [5]; }
export class Producao83 implements Producao { code = 83; tokens = [6]; }
export class Producao84 implements Producao { code = 84; tokens = [7]; }
export class Producao85 implements Producao { code = 85; tokens = [9]; }
export class Producao86 implements Producao { code = 86; tokens = [8]; }
export class Producao87 implements Producao { code = 87; tokens = [43, 64, 42]; }


export const PRODUCOES: Producao[] = [
  new Producao1(), new Producao2(), new Producao3(), new Producao4(), new Producao5(),
  new Producao6(), new Producao7(), new Producao8(), new Producao9(), new Producao10(),
  new Producao11(), new Producao12(), new Producao13(), new Producao14(), new Producao15(),
  new Producao16(), new Producao17(), new Producao18(), new Producao19(), new Producao20(),
  new Producao21(), new Producao22(), new Producao23(), new Producao24(), new Producao25(),
  new Producao26(), new Producao27(), new Producao28(), new Producao29(), new Producao30(),
  new Producao31(), new Producao32(), new Producao33(), new Producao34(), new Producao35(),
  new Producao36(), new Producao37(), new Producao38(), new Producao39(), new Producao40(),
  new Producao41(), new Producao42(), new Producao43(), new Producao44(), new Producao45(),
  new Producao46(), new Producao47(), new Producao48(), new Producao49(), new Producao50(),
  new Producao51(), new Producao52(), new Producao53(), new Producao54(), new Producao55(),
  new Producao56(), new Producao57(), new Producao58(), new Producao59(), new Producao60(),
  new Producao61(), new Producao62(), new Producao63(), new Producao64(), new Producao65(),
  new Producao66(), new Producao67(), new Producao68(), new Producao69(), new Producao70(),
  new Producao71(), new Producao72(), new Producao73(), new Producao74(), new Producao75(),
  new Producao76(), new Producao77(), new Producao78(), new Producao79(), new Producao80(),
  new Producao81(), new Producao82(), new Producao83(), new Producao84(), new Producao85(),
  new Producao86(), new Producao87()
];

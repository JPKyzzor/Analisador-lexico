# Analisador Léxico, Sintático e Semântico

Este projeto foi desenvolvido como parte da disciplina de **Compiladores** do curso de **Ciência da Computação** da **Unesc**.

O objetivo principal é implementar um **analisador léxico**, **analisador sintático** e **analisador semântico** capazes de processar uma linguagem de programação criada especificamente para o semestre.

---

## 🎯 Funcionalidades

- **Analisador Léxico**: Identifica e classifica os tokens do código-fonte
- **Analisador Sintático**: Valida a estrutura sintática do código usando análise preditiva (LL1)
- **Analisador Semântico**:
  - Gerencia tabela de símbolos com escopo (níveis)
  - Verifica declaração de variáveis e funções
  - Valida tipos em operações (soma, concatenação)
  - Detecta erros semânticos como variáveis não declaradas e incompatibilidade de tipos
- **Sistema de Configuração**: Controle de comportamento dos analisadores
  - Exibição da pilha do analisador sintático
  - Log da tabela de símbolos
  - Controle de parada em erros semânticos
- **Sistema de Log**: Logger customizado com identificação por tipo de analisador
- **Processamento em Lote**: Analisa múltiplos exemplos de código automaticamente
- **Relatórios de Saída**: Gera arquivos de saída com tokens identificados e resultados da análise

---

## 📁 Estrutura do Projeto

```
analisador/
├── assets/                    # Arquivos de entrada e saída
│   ├── exemplo1/
│   │   ├── input.txt         # Código-fonte do exemplo 1
│   │   └── output.txt        # Resultado da análise do exemplo 1
│   ├── exemplo2/
│   │   ├── input.txt         # Código-fonte do exemplo 2
│   │   └── output.txt        # Resultado da análise do exemplo 2
│   ├── exemplo3/
│   │   ├── input.txt         # Código-fonte do exemplo 3
│   │   └── output.txt        # Resultado da análise do exemplo 3
│   ├── gramatica.pdf         # Produções da linguagem e numeração dos tokens
│   └── manual.pdf            # Manual detalhado do grupo sobre a linguagem
├── lexico/                    # Analisador léxico
│   ├── AnalisadorLexico.ts   # Classe principal do analisador léxico
│   ├── enum/                 # Enumerações de tokens
│   └── State/                # Máquina de estados para análise léxica
├── sintatico/                 # Analisador sintático
│   ├── AnalisadorSintatico.ts # Classe principal do analisador sintático
│   └── producoes/            # Produções da gramática e tabela de parsing
│       ├── producoes.ts      # Definição das produções
│       ├── tabela-parser.ts  # Tabela de parsing LL1
│       └── tokenMap.ts       # Mapeamento de tokens terminais e não-terminais
├── semantico/                 # Analisador semântico
│   └── AnalisadorSemantico.ts # Validação semântica e tabela de símbolos
├── shared/                    # Tipos e enums compartilhados
│   ├── types/                # Definições de tipos TypeScript
│   │   ├── TokenInfo.ts      # Informações de tokens
│   │   ├── StateResponse.ts  # Resposta da máquina de estados
│   │   ├── Simbolo.ts        # Estrutura de símbolos
│   │   └── AnalisadorConfig.ts # Configurações do analisador
│   └── enum/                 # Enumerações compartilhadas
│       ├── TokenCodes.enum.ts      # Códigos de tokens
│       ├── TipoSemantico.enum.ts   # Tipos semânticos
│       ├── CategoriaSemantica.enum.ts # Categorias de símbolos
│       └── ErroSemanticoEnum.ts    # Tipos de erros semânticos
├── logger/                    # Sistema de logging
│   └── logger.ts             # Logger customizado com tipos de analisador
└── main.ts                    # Ponto de entrada da aplicação com configurações
```

### 📄 Arquivos na Pasta `assets`

- **`exemplo1/`, `exemplo2/`, `exemplo3/`**: Cada pasta contém:
  - **`input.txt`**: Código-fonte a ser analisado
  - **`output.txt`**: Resultado da análise (tokens + validação sintática)
- **`gramatica.pdf`**: Documento com todas as produções da linguagem e numeração dos tokens
- **`manual.pdf`**: Manual produzido pelo grupo detalhando a linguagem e implementação

---

## ⚙️ Configurações do Analisador

O arquivo `main.ts` contém configurações que controlam o comportamento dos analisadores:

```typescript
export const configProjeto: TAnalisadorConfig = {
  mostrarPilhaSintatico: false, // Exibe a pilha do sintático a cada iteração
  mostrarTabelaSimbolos: true, // Log ao adicionar/remover símbolos
  quebrarNoSemantico: true, // Para execução ao encontrar erro semântico
};
```

### Opções de Configuração:

- **`mostrarPilhaSintatico`**: Quando `true`, exibe o estado da pilha do analisador sintático a cada iteração
- **`mostrarTabelaSimbolos`**: Quando `true`, registra no log cada vez que um símbolo é adicionado ou removido da tabela
- **`quebrarNoSemantico`**: Quando `true`, interrompe a análise ao encontrar o primeiro erro semântico; quando `false`, continua e reporta todos os erros

---

## 🛠️ Tecnologias Utilizadas

- **TypeScript**: Linguagem principal do projeto
- **Node.js**: Ambiente de execução
- **ts-node**: Execução direta de TypeScript
- **Machine State Pattern**: Padrão de projeto para análise léxica
- **Parser LL1**: Análise sintática preditiva
- **Tabela de Símbolos**: Gerenciamento de escopo e tipos para análise semântica

---

## 🚀 Como Executar

### Pré-requisitos

Certifique-se de ter o **Node.js** e o **npm** instalados em sua máquina.

### Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/JPKyzzor/Analisador-lexico.git
cd Analisador-lexico
npm install
```

### Executar o Analisador

Para rodar o projeto e analisar todos os exemplos:

```bash
npm run start
```

O comando irá:

1. Processar os arquivos `input.txt` de cada exemplo
2. Executar a análise léxica identificando todos os tokens
3. Executar a análise sintática validando a estrutura do código
4. Executar a análise semântica verificando tipos e declarações
5. Gerar os arquivos `output.txt` com os resultados

### Compilar o Projeto

Para compilar o TypeScript para JavaScript:

```bash
npm run build
```

Os arquivos compilados serão gerados em `analisador/main/dist/`.

---

## 🐛 Debug

O projeto está configurado para debug no VS Code com duas opções:

1. **Debug with ts-node** (Recomendado): Executa diretamente o TypeScript
2. **Debug with Build**: Executa a versão compilada

Para iniciar o debug:

- Pressione `F5` ou vá em **Run → Start Debugging**
- Escolha a configuração desejada

---

## 📊 Formato de Saída

Os arquivos `output.txt` contêm:

```
<código_token> <valor> linha <número_linha>
<código_token> <valor> linha <número_linha>
...

Código passou pelo analisador sintático sem erros.
```

### Tipos de Mensagens:

- **Sucesso**: Indica que o código passou por todas as análises (léxica, sintática e semântica)
- **Erro Léxico**: Reporta tokens não reconhecidos ou malformados
- **Erro Sintático**: Indica violações da gramática da linguagem
- **Erro Semântico**: Reporta problemas como:
  - Variáveis não declaradas
  - Incompatibilidade de tipos em operações
  - Tentativa de operações inválidas (ex: concatenação com char)

O console exibirá logs formatados com emojis indicando o tipo de análise e resultado:

- ℹ️ `[MAIN]` - Informações gerais
- ℹ️ `[Léxico]` - Logs do analisador léxico
- ℹ️ `[Sintático]` - Logs do analisador sintático
- ℹ️ `[Semântico]` - Logs do analisador semântico
- ✅ - Sucesso na análise
- ❌ - Erro encontrado

---

## 👥 Integrantes do Grupo

- **João Pedro Carlos da Silva**
- **Augusto Gonçalves Satiro**
- **Amanda Maia**

---

## 📝 Licença

Este projeto está sob a licença ISC.

---

## 🔗 Links

- [Repositório GitHub](https://github.com/JPKyzzor/Analisador-lexico)
- [Issues](https://github.com/JPKyzzor/Analisador-lexico/issues)

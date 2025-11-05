# Analisador Léxico e Sintático

Este projeto foi desenvolvido como parte da disciplina de **Compiladores** do curso de **Ciência da Computação** da **Unesc**.  

O objetivo principal é implementar um **analisador léxico** e **analisador sintático** capazes de processar uma linguagem de programação criada especificamente para o semestre.

---

## 🎯 Funcionalidades

- **Analisador Léxico**: Identifica e classifica os tokens do código-fonte
- **Analisador Sintático**: Valida a estrutura sintática do código usando análise preditiva (LL1)
- **Sistema de Log**: Logger customizado com identificação por tipo de analisador
- **Processamento em Lote**: Analisa múltiplos exemplos de código automaticamente
- **Relatórios de Saída**: Gera arquivos de saída com tokens identificados e resultados da análise

---

### 📄 Arquivos na Pasta `assets`

- **`exemplo1/`, `exemplo2/`, `exemplo3/`**: Cada pasta contém:
  - **`input.txt`**: Código-fonte a ser analisado
  - **`output.txt`**: Resultado da análise (tokens + validação sintática)
- **`gramatica.pdf`**: Documento com todas as produções da linguagem e numeração dos tokens
- **`manual.pdf`**: Manual produzido pelo grupo detalhando a linguagem e implementação

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
4. Gerar os arquivos `output.txt` com os resultados

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

Em caso de erro léxico ou sintático, a mensagem de erro será exibida no arquivo de saída e no console.

---

## 👥 Integrantes do Grupo

- **João Pedro Carlos da Silva**  
- **Augusto Gonçalves Satiro**  
- **Amanda Maia**  

---

## 🔗 Links

- [Repositório GitHub](https://github.com/JPKyzzor/Analisador-lexico)
- [Issues](https://github.com/JPKyzzor/Analisador-lexico/issues)

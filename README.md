# valor-por-extenso

Biblioteca em TypeScript para converter valores numéricos e monetários para texto em português.

## Instalação

Instale as dependências:

```bash
bun install
```

## Executar o projeto

Para executar o exemplo principal:

```bash
bun run src/main.ts
```

Ou, usando o script configurado no `package.json`:

```bash
bun run start
```

## Testes

Para executar toda a suíte de testes:

```bash
bun test
```

A suíte verifica as regras de conversão de números, parsing de valores monetários e conversão de reais e centavos para extenso.

## Estrutura do projeto

```text
valor-por-extenso/
├── src/
│   ├── index.ts
│   ├── main.ts
│   ├── extenso.ts
│   ├── moeda.ts
│   └── parse.ts
├── tests/
│   ├── extenso.test.ts
│   ├── moeda.test.ts
│   └── parse.test.ts
├── package.json
└── tsconfig.json
```

### `src/extenso.ts`

Responsável pela conversão de números inteiros para texto.

Exemplos:

```text
31 → trinta e um
100 → cem
1.000 → mil
1.000.000 → um milhão
```

### `src/parse.ts`

Responsável por interpretar valores monetários e convertê-los para centavos inteiros.

Exemplos:

```text
"31,42" → 3142
"R$ 1.234,56" → 123456
"31,5" → 3150
"31,456" → 3145
```

### `src/moeda.ts`

Responsável por transformar os centavos em valor monetário por extenso.

Exemplo:

```text
R$ 31,42
→ trinta e um reais e quarenta e dois centavos
```

### `src/index.ts`

Expõe as funções públicas da biblioteca.

## Exemplos

```ts
import {
  inteiroPorExtenso,
  valorMonetarioPorExtenso,
} from "./src";

inteiroPorExtenso(1234);
// "mil duzentos e trinta e quatro"

valorMonetarioPorExtenso("R$ 31,42");
// "trinta e um reais e quarenta e dois centavos"
```

## Regras implementadas

A biblioteca contempla regras como:

* números de 10 a 19;
* diferença entre `cem` e `cento`;
* `mil` sem o artigo `um`;
* uso do conectivo `e`;
* escalas de milhão, bilhão e trilhão;
* singular e plural de reais e centavos;
* uso de `de` em valores que terminam exatamente em milhão, bilhão ou trilhão;
* representação monetária em centavos inteiros para evitar problemas de precisão de ponto flutuante.

## Status

Projeto em desenvolvimento.

A suíte atual contém testes para as principais regras gramaticais, parsing monetário e conversão de valores.

O projeto utiliza Bun e TypeScript.

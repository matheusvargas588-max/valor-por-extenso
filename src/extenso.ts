const UNIDADES = [
  "",
  "um",
  "dois",
  "três",
  "quatro",
  "cinco",
  "seis",
  "sete",
  "oito",
  "nove",
] as const;

const DEZ_A_DEZENOVE = [
  "dez",
  "onze",
  "doze",
  "treze",
  "quatorze",
  "quinze",
  "dezesseis",
  "dezessete",
  "dezoito",
  "dezenove",
] as const;

const DEZENAS = [
  "",
  "dez",
  "vinte",
  "trinta",
  "quarenta",
  "cinquenta",
  "sessenta",
  "setenta",
  "oitenta",
  "noventa",
] as const;

const CENTENAS = [
  "",
  "cento",
  "duzentos",
  "trezentos",
  "quatrocentos",
  "quinhentos",
  "seiscentos",
  "setecentos",
  "oitocentos",
  "novecentos",
] as const;

const ESCALAS = [
  null,
  {
    singular: "mil",
    plural: "mil",
  },
  {
    singular: "milhão",
    plural: "milhões",
  },
  {
    singular: "bilhão",
    plural: "bilhões",
  },
  {
    singular: "trilhão",
    plural: "trilhões",
  },
] as const;

export function grupoPorExtenso(numero: number): string {
  if (
    numero < 0 ||
    numero > 999 ||
    !Number.isInteger(numero)
  ) {
    throw new RangeError(
      "O grupo deve ser um número entre 0 e 999",
    );
  }

  if (numero === 0) {
    return "";
  }

  // 100 é uma exceção:
  // 100 = "cem"
  // 101 = "cento e um"
  if (numero === 100) {
    return "cem";
  }

  const centena = Math.floor(numero / 100);
  const resto = numero % 100;

  const partes: string[] = [];

  if (centena > 0) {
    partes.push(CENTENAS[centena]!);
  }

  if (resto > 0) {
    if (resto < 10) {
      partes.push(UNIDADES[resto]!);
    } else if (resto < 20) {
      partes.push(DEZ_A_DEZENOVE[resto - 10]!);
    } else {
      const dezena = Math.floor(resto / 10);
      const unidade = resto % 10;

      if (unidade === 0) {
        partes.push(DEZENAS[dezena]!);
      } else {
        partes.push(
          `${DEZENAS[dezena]} e ${UNIDADES[unidade]}`
        );
      }
    }
  }

  return partes.join(" e ");
}

function separarEmGrupos(numero: number): number[] {
  const grupos: number[] = [];
  let restante = numero;

  while (restante > 0) {
    grupos.push(restante % 1000);
    restante = Math.floor(restante / 1000);
  }

  return grupos;
}

function deveUsarE(grupo: number): boolean {
  return grupo < 100 || grupo % 100 === 0;
}

export function inteiroPorExtenso(numero: number): string {
  if (!Number.isFinite(numero)) {
    throw new TypeError("O número deve ser finito");
  }

  if (!Number.isSafeInteger(numero) || numero < 0) {
    throw new RangeError(
      "O número deve ser um inteiro não negativo e seguro"
    );
  }

  if (numero === 0) {
    return "zero";
  }

  const grupos = separarEmGrupos(numero);

  const partes: Array<{
    grupo: number;
    texto: string;
  }> = [];

  // Os grupos são armazenados do menor para o maior.
  // Exemplo: 1.234.567 -> [567, 234, 1].
  // Por isso, percorremos do último índice para o primeiro.
  for (
    let indice = grupos.length - 1;
    indice >= 0;
    indice--
  ) {
    const grupo = grupos[indice]!;

    // Grupos zerados não geram texto.
    // Exemplo: 1.000.020 -> [20, 0, 1].
    if (grupo === 0) {
      continue;
    }

    // O grupo das unidades não possui escala.
    if (indice === 0) {
      partes.push({
        grupo,
        texto: grupoPorExtenso(grupo),
      });

      continue;
    }

    // 1.000 = "mil", e não "um mil".
    if (indice === 1 && grupo === 1) {
      partes.push({
        grupo,
        texto: "mil",
      });

      continue;
    }

    const escala = ESCALAS[indice];

    if (!escala) {
      throw new RangeError(
        "O número ultrapassa as escalas suportadas"
      );
    }

    const nomeEscala =
      grupo === 1
        ? escala.singular
        : escala.plural;

    partes.push({
      grupo,
      texto: `${grupoPorExtenso(grupo)} ${nomeEscala}`,
    });
  }

  if (partes.length === 1) {
    return partes[0]!.texto;
  }

  const ultimaParte = partes[partes.length - 1]!;

  const partesAnteriores = partes
    .slice(0, -1)
    .map((parte) => parte.texto)
    .join(" ");

  const conectivo = deveUsarE(ultimaParte.grupo)
    ? " e "
    : " ";

  return partesAnteriores + conectivo + ultimaParte.texto;
}

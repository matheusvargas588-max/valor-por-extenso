export type ValorMonetario = number | string;

export function parseParaCentavos(
  valor: ValorMonetario,
): number {
  // Entrada numérica: converte diretamente para centavos.
  if (typeof valor === "number") {
    if (!Number.isFinite(valor)) {
      throw new TypeError(
        "O valor deve ser um número finito.",
      );
    }

    if (valor < 0) {
      throw new RangeError(
        "Valores negativos ainda não são suportados.",
      );
    }

    // Arredonda para evitar problemas de precisão de ponto flutuante.
    const totalCentavos = Math.round(valor * 100);

    if (!Number.isSafeInteger(totalCentavos)) {
      throw new RangeError(
        "O valor ultrapassa o limite numérico suportado.",
      );
    }

    return totalCentavos;
  }

  // Entrada textual: remove espaços externos.
  const texto = valor.trim();

  if (texto.length === 0) {
    throw new TypeError(
      "O valor monetário não pode ser uma string vazia.",
    );
  }

  // Remove o prefixo R$ e espaços internos.
  const semMoeda = texto
    .replace(/^R\$\s*/, "")
    .replace(/\s/g, "");

  // Aceita formato brasileiro:
  // 31
  // 31,42
  // 31,5
  // 31,456
  // 1.234,56
  const formatoBrasileiro =
    /^(?:\d{1,3}(?:\.\d{3})+|\d+)(?:,\d+)?$/;

  if (!formatoBrasileiro.test(semMoeda)) {
    throw new TypeError(
      `Valor monetário inválido: "${valor}"`,
    );
  }

  // Remove os pontos usados como separadores de milhar.
  const normalizado = semMoeda.replace(/\./g, "");

  const [
    parteInteira = "0",
    parteDecimal = "",
  ] = normalizado.split(",");

  // Normaliza a parte decimal para exatamente duas casas.
  // "5"   -> "50"
  // "45"  -> "45"
  // "456" -> "45"
  const decimalNormalizada = parteDecimal
    .padEnd(2, "0")
    .slice(0, 2);

  const reais = Number.parseInt(
    parteInteira,
    10,
  );

  const centavos = Number.parseInt(
    decimalNormalizada || "0",
    10,
  );

  const totalCentavos =
    reais * 100 + centavos;

  if (!Number.isSafeInteger(totalCentavos)) {
    throw new RangeError(
      "O valor ultrapassa o limite numérico suportado.",
    );
  }

  return totalCentavos;
}

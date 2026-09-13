import {
  parseParaCentavos,
  type ValorMonetario,
} from "./parse";
import { inteiroPorExtenso } from "./extenso";

/**
 * Usa "de" quando o valor termina exatamente
 * em milhão, bilhão ou trilhão.
 */
function usaPreposicaoDe(reais: number): boolean {
  return reais >= 1_000_000 && reais % 1_000_000 === 0;
}

export function valorMonetarioPorExtenso(
  valor: ValorMonetario,
): string {
  const total = parseParaCentavos(valor);

  const reais = Math.floor(total / 100);
  const centavos = total % 100;

  const reaisExtenso = inteiroPorExtenso(reais);
  const centavosExtenso = inteiroPorExtenso(centavos);

  let resultado = "";

  if (reais > 0) {
    const moedaReais = reais === 1
      ? "real"
      : "reais";

    const preposicao = usaPreposicaoDe(reais)
      ? " de"
      : "";

    resultado = `${reaisExtenso}${preposicao} ${moedaReais}`;
  }

  if (centavos > 0) {
    const moedaCentavos = centavos === 1
      ? "centavo"
      : "centavos";

    const textoCentavos =
      `${centavosExtenso} ${moedaCentavos}`;

    resultado = resultado.length > 0
      ? `${resultado} e ${textoCentavos}`
      : textoCentavos;
  }

  // 0,00 não possui reais nem centavos para compor.
  if (reais === 0 && centavos === 0) {
    resultado = "zero reais";
  }

  return resultado;
}

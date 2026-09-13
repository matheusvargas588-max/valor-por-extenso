import { describe, expect, test } from "bun:test";
import { inteiroPorExtenso } from "../src/index";

describe("inteiroPorExtenso", () => {
  // ---------------------------------------
  // Números básicos
  // ---------------------------------------

  test("7 deve retornar sete", () => {
    expect(inteiroPorExtenso(7)).toBe("sete");
  });

  // ---------------------------------------
  // Regra 1: números de 10 a 19
  // ---------------------------------------

  test("10 deve retornar dez", () => {
    expect(inteiroPorExtenso(10)).toBe("dez");
  });

  test("11 deve retornar onze", () => {
    expect(inteiroPorExtenso(11)).toBe("onze");
  });

  test("12 deve retornar doze", () => {
    expect(inteiroPorExtenso(12)).toBe("doze");
  });

  test("13 deve retornar treze", () => {
    expect(inteiroPorExtenso(13)).toBe("treze");
  });

  test("14 deve retornar quatorze", () => {
    expect(inteiroPorExtenso(14)).toBe("quatorze");
  });

  test("15 deve retornar quinze", () => {
    expect(inteiroPorExtenso(15)).toBe("quinze");
  });

  test("16 deve retornar dezesseis", () => {
    expect(inteiroPorExtenso(16)).toBe("dezesseis");
  });

  test("17 deve retornar dezessete", () => {
    expect(inteiroPorExtenso(17)).toBe("dezessete");
  });

  test("18 deve retornar dezoito", () => {
    expect(inteiroPorExtenso(18)).toBe("dezoito");
  });

  test("19 deve retornar dezenove", () => {
    expect(inteiroPorExtenso(19)).toBe("dezenove");
  });

  // ---------------------------------------
  // Dezenas
  // ---------------------------------------

  test("31 deve retornar trinta e um", () => {
    expect(inteiroPorExtenso(31)).toBe("trinta e um");
  });

  // ---------------------------------------
  // Regra 2: cem x cento
  // ---------------------------------------

  test("100 deve retornar cem", () => {
    expect(inteiroPorExtenso(100)).toBe("cem");
  });

  test("101 deve retornar cento e um", () => {
    expect(inteiroPorExtenso(101)).toBe("cento e um");
  });

  test("110 deve retornar cento e dez", () => {
    expect(inteiroPorExtenso(110)).toBe("cento e dez");
  });

  test("120 deve retornar cento e vinte", () => {
    expect(inteiroPorExtenso(120)).toBe("cento e vinte");
  });

  test("345 deve retornar trezentos e quarenta e cinco", () => {
    expect(inteiroPorExtenso(345))
      .toBe("trezentos e quarenta e cinco");
  });

  test("999 deve retornar novecentos e noventa e nove", () => {
    expect(inteiroPorExtenso(999))
      .toBe("novecentos e noventa e nove");
  });

  // ---------------------------------------
  // Regra 3: mil sem artigo
  // ---------------------------------------

  test("1000 deve retornar mil", () => {
    expect(inteiroPorExtenso(1000))
      .toBe("mil");
  });

  test("2000 deve retornar dois mil", () => {
    expect(inteiroPorExtenso(2000))
      .toBe("dois mil");
  });

  test("10000 deve retornar dez mil", () => {
    expect(inteiroPorExtenso(10000))
      .toBe("dez mil");
  });

  // ---------------------------------------
  // Regra 4: conectivo "e"
  // ---------------------------------------

  test("1001 deve retornar mil e um", () => {
    expect(inteiroPorExtenso(1001))
      .toBe("mil e um");
  });

  test("1100 deve retornar mil e cem", () => {
    expect(inteiroPorExtenso(1100))
      .toBe("mil e cem");
  });

  test("1234 deve retornar mil duzentos e trinta e quatro", () => {
    expect(inteiroPorExtenso(1234))
      .toBe("mil duzentos e trinta e quatro");
  });

  test("2500 deve retornar dois mil e quinhentos", () => {
    expect(inteiroPorExtenso(2500))
      .toBe("dois mil e quinhentos");
  });

  test("2310 deve retornar dois mil trezentos e dez", () => {
    expect(inteiroPorExtenso(2310))
      .toBe("dois mil trezentos e dez");
  });

  // ---------------------------------------
  // Milhões e grupos intermediários
  // ---------------------------------------

  test("1000020 deve retornar um milhão e vinte", () => {
    expect(inteiroPorExtenso(1000020))
      .toBe("um milhão e vinte");
  });

  test("1000001 deve retornar um milhão e um", () => {
    expect(inteiroPorExtenso(1000001))
      .toBe("um milhão e um");
  });
  test("1000000000 deve retornar um bilhão", () => {
    expect(inteiroPorExtenso(1000000000))
      .toBe("um bilhão");
  });

  test("2000000000 deve retornar dois bilhões", () => {
    expect(inteiroPorExtenso(2000000000))
      .toBe("dois bilhões");
  });

  test("1000000000000 deve retornar um trilhão", () => {
    expect(inteiroPorExtenso(1000000000000))
      .toBe("um trilhão");
  });

  test("2000000000000 deve retornar dois trilhões", () => {
    expect(inteiroPorExtenso(2000000000000))
      .toBe("dois trilhões");
  });
  test(
    "1234567 deve retornar um milhão duzentos e trinta e quatro mil quinhentos e sessenta e sete",
    () => {
      expect(inteiroPorExtenso(1234567))
        .toBe(
          "um milhão duzentos e trinta e quatro mil quinhentos e sessenta e sete",
        );
    },
  );
  // ---------------------------------------
  // Propriedades gerais da saída
  // ---------------------------------------

  test("não deve conter dois espaços seguidos", () => {
    const numeros = [
      0,
      1,
      7,
      10,
      19,
      31,
      100,
      101,
      999,
      1000,
      1001,
      1234,
      2500,
      1000001,
      1234567,
      1000000000,
      2000000000000,
    ];

    for (const numero of numeros) {
      const resultado = inteiroPorExtenso(numero);

      expect(resultado).not.toContain("  ");
    }
  });

  test("não deve terminar com 'e'", () => {
    const numeros = [
      0,
      1,
      7,
      10,
      19,
      31,
      100,
      101,
      999,
      1000,
      1001,
      1234,
      2500,
      1000001,
      1234567,
      1000000000,
      2000000000000,
    ];

    for (const numero of numeros) {
      const resultado = inteiroPorExtenso(numero);

      expect(resultado).not.toMatch(/ e$/);
    }
  });
});

import { describe, expect, test } from "bun:test";
import { valorMonetarioPorExtenso } from "../src/index";

describe("valorMonetarioPorExtenso", () => {
  // ---------------------------------------
  // Zero
  // ---------------------------------------

  test("0,00 deve retornar zero reais", () => {
    expect(valorMonetarioPorExtenso("R$ 0,00"))
      .toBe("zero reais");
  });

  // ---------------------------------------
  // Regra 1: singular e plural
  // ---------------------------------------

  test("0,01 deve retornar um centavo", () => {
    expect(valorMonetarioPorExtenso("R$ 0,01"))
      .toBe("um centavo");
  });

  test("1,00 deve retornar um real", () => {
    expect(valorMonetarioPorExtenso("R$ 1,00"))
      .toBe("um real");
  });

  test("1,01 deve retornar um real e um centavo", () => {
    expect(valorMonetarioPorExtenso("R$ 1,01"))
      .toBe("um real e um centavo");
  });

  test("19,00 deve retornar dezenove reais", () => {
    expect(valorMonetarioPorExtenso("R$ 19,00"))
      .toBe("dezenove reais");
  });

  test("31,42 deve retornar trinta e um reais e quarenta e dois centavos", () => {
    expect(valorMonetarioPorExtenso("R$ 31,42"))
      .toBe("trinta e um reais e quarenta e dois centavos");
  });

  test("0,50 deve retornar cinquenta centavos", () => {
    expect(valorMonetarioPorExtenso("R$ 0,50"))
      .toBe("cinquenta centavos");
  });

  // ---------------------------------------
  // Regras de extenso dos reais
  // ---------------------------------------

  test("100,00 deve retornar cem reais", () => {
    expect(valorMonetarioPorExtenso("R$ 100,00"))
      .toBe("cem reais");
  });

  test("101,00 deve retornar cento e um reais", () => {
    expect(valorMonetarioPorExtenso("R$ 101,00"))
      .toBe("cento e um reais");
  });

  test("1.000,00 deve retornar mil reais", () => {
    expect(valorMonetarioPorExtenso("R$ 1.000,00"))
      .toBe("mil reais");
  });

  test("1.001,00 deve retornar mil e um reais", () => {
    expect(valorMonetarioPorExtenso("R$ 1.001,00"))
      .toBe("mil e um reais");
  });

  test("1.100,00 deve retornar mil e cem reais", () => {
    expect(valorMonetarioPorExtenso("R$ 1.100,00"))
      .toBe("mil e cem reais");
  });

  test("1.234,00 deve retornar mil duzentos e trinta e quatro reais", () => {
    expect(valorMonetarioPorExtenso("R$ 1.234,00"))
      .toBe("mil duzentos e trinta e quatro reais");
  });

  // ---------------------------------------
  // Regra 2: preposição "de"
  // ---------------------------------------

  test("1.000.000,00 deve retornar um milhão de reais", () => {
    expect(valorMonetarioPorExtenso("R$ 1.000.000,00"))
      .toBe("um milhão de reais");
  });

  test("2.000.000,00 deve retornar dois milhões de reais", () => {
    expect(valorMonetarioPorExtenso("R$ 2.000.000,00"))
      .toBe("dois milhões de reais");
  });

  test("1.000.001,00 deve retornar um milhão e um reais", () => {
    expect(valorMonetarioPorExtenso("R$ 1.000.001,00"))
      .toBe("um milhão e um reais");
  });

  // ---------------------------------------
  // Regra 3: junção de reais e centavos
  // ---------------------------------------

  test("2.000.100,00 deve retornar dois milhões e cem reais", () => {
    expect(valorMonetarioPorExtenso("R$ 2.000.100,00"))
      .toBe("dois milhões e cem reais");
  });

  test("31,42 deve ligar reais e centavos com 'e'", () => {
    expect(valorMonetarioPorExtenso("R$ 31,42"))
      .toBe("trinta e um reais e quarenta e dois centavos");
  });

  test("0,50 não deve incluir 'zero reais'", () => {
    expect(valorMonetarioPorExtenso("R$ 0,50"))
      .toBe("cinquenta centavos");
  });
});

import { describe, expect, test } from "bun:test";
import { parseParaCentavos } from "../src/index";

describe("parseParaCentavos", () => {
  // ---------------------------------------
  // Valores monetários básicos
  // ---------------------------------------

  test("R$ 31,42 deve retornar 3142 centavos", () => {
    expect(parseParaCentavos("R$ 31,42")).toBe(3142);
  });

  test("R$ 1,00 deve retornar 100 centavos", () => {
    expect(parseParaCentavos("R$ 1,00")).toBe(100);
  });

  test("R$ 0,01 deve retornar 1 centavo", () => {
    expect(parseParaCentavos("R$ 0,01")).toBe(1);
  });

  test("R$ 0,00 deve retornar zero centavos", () => {
    expect(parseParaCentavos("R$ 0,00")).toBe(0);
  });

  test("31 deve retornar 3100 centavos", () => {
    expect(parseParaCentavos("31")).toBe(3100);
  });

  test("31,0 deve interpretar uma casa decimal como 10 centavos", () => {
    expect(parseParaCentavos("31,0")).toBe(3100);
  });

  test("0,1 deve interpretar 1 como 10 centavos", () => {
    expect(parseParaCentavos("0,1")).toBe(10);
  });

  // ---------------------------------------
  // Pontos de milhar
  // ---------------------------------------

  test("R$ 1.234,56 deve ignorar o ponto de milhar", () => {
    expect(parseParaCentavos("R$ 1.234,56")).toBe(123456);
  });

  test("10.000,99 deve retornar 1000099 centavos", () => {
    expect(parseParaCentavos("10.000,99")).toBe(1000099);
  });

  // ---------------------------------------
  // Prefixo R$ e espaços
  // ---------------------------------------

  test("R$1,00 deve ser aceito sem espaço após R$", () => {
    expect(parseParaCentavos("R$1,00")).toBe(100);
  });

  test("R$    1,00 deve aceitar múltiplos espaços", () => {
    expect(parseParaCentavos("R$    1,00")).toBe(100);
  });

  test("espaços externos devem ser ignorados", () => {
    expect(parseParaCentavos("  R$ 31,42  ")).toBe(3142);
  });

  // ---------------------------------------
  // Casas decimais
  // ---------------------------------------

  test("31,5 deve interpretar 5 como 50 centavos", () => {
    expect(parseParaCentavos("31,5")).toBe(3150);
  });

  test("31,50 deve retornar 3150 centavos", () => {
    expect(parseParaCentavos("31,50")).toBe(3150);
  });

  test("31,456 deve truncar para duas casas decimais", () => {
    expect(parseParaCentavos("31,456")).toBe(3145);
  });

  test("R$ 12,345 deve truncar para duas casas decimais", () => {
    expect(parseParaCentavos("R$ 12,345")).toBe(1234);
  });

  // ---------------------------------------
  // Entrada numérica
  // ---------------------------------------

  test("um número deve ser convertido para centavos", () => {
    expect(parseParaCentavos(31.42)).toBe(3142);
  });

  test("zero deve retornar zero centavos", () => {
    expect(parseParaCentavos(0)).toBe(0);
  });

  test("Infinity deve lançar TypeError", () => {
    expect(() => parseParaCentavos(Infinity))
      .toThrow(TypeError);
  });

  test("NaN deve lançar TypeError", () => {
    expect(() => parseParaCentavos(NaN))
      .toThrow(TypeError);
  });

  test("valor negativo deve lançar RangeError", () => {
    expect(() => parseParaCentavos(-10))
      .toThrow(RangeError);
  });

  // ---------------------------------------
  // Entradas inválidas
  // ---------------------------------------

  test("texto inválido deve lançar TypeError", () => {
    expect(() => parseParaCentavos("abc"))
      .toThrow(TypeError);
  });

  test("vírgula sem parte inteira deve lançar TypeError", () => {
    expect(() => parseParaCentavos(",50"))
      .toThrow(TypeError);
  });

  test("ponto de milhar malformado deve lançar TypeError", () => {
    expect(() => parseParaCentavos("1.23,45"))
      .toThrow(TypeError);
  });

  test("ponto de milhar duplicado deve lançar TypeError", () => {
    expect(() => parseParaCentavos("1..000,00"))
      .toThrow(TypeError);
  });

  test("mais de uma vírgula deve lançar TypeError", () => {
    expect(() => parseParaCentavos("1,2,3"))
      .toThrow(TypeError);
  });

  // ---------------------------------------
  // Limite numérico
  // ---------------------------------------

  test("valor numérico acima do limite seguro deve lançar RangeError", () => {
    expect(() => parseParaCentavos(Number.MAX_SAFE_INTEGER))
      .toThrow(RangeError);
  });

  test("string numérica acima do limite seguro deve lançar RangeError", () => {
    expect(() =>
      parseParaCentavos("9007199254740992,00")
    ).toThrow(RangeError);
  });
});

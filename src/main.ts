import { valorMonetarioPorExtenso } from "./index";

function main(): void {
  console.log("=== TESTES DE VALORES MONETÁRIOS ===");

  console.log("0,00 ->", valorMonetarioPorExtenso("R$ 0,00"));
  console.log("0,01 ->", valorMonetarioPorExtenso("R$ 0,01"));
  console.log("1,00 ->", valorMonetarioPorExtenso("R$ 1,00"));
  console.log("1,01 ->", valorMonetarioPorExtenso("R$ 1,01"));
  console.log("19,00 ->", valorMonetarioPorExtenso("R$ 19,00"));
  console.log("100,00 ->", valorMonetarioPorExtenso("R$ 100,00"));
  console.log("101,00 ->", valorMonetarioPorExtenso("R$ 101,00"));
  console.log("1.000,00 ->", valorMonetarioPorExtenso("R$ 1.000,00"));
  console.log("1.001,00 ->", valorMonetarioPorExtenso("R$ 1.001,00"));
  console.log("1.100,00 ->", valorMonetarioPorExtenso("R$ 1.100,00"));
  console.log("1.234,00 ->", valorMonetarioPorExtenso("R$ 1.234,00"));
  console.log("31,42 ->", valorMonetarioPorExtenso("R$ 31,42"));
  console.log("1.000.000,00 ->", valorMonetarioPorExtenso("R$ 1.000.000,00"));
  console.log("1.000.001,00 ->", valorMonetarioPorExtenso("R$ 1.000.001,00"));
  console.log("2.000.000,00 ->", valorMonetarioPorExtenso("R$ 2.000.000,00"));
}

main();

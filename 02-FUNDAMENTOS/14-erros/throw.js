const x = 10;

// checar se x é um número
if (!Number.isInteger(x)) {
  throw new Error("O Valor de x não é um número inteiro!");
}

console.log("Continue o código...");

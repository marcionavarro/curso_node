import chalk from "chalk";

const nota = 5;

if (nota >= 7) {
  console.log(chalk.green("Parabéns! Voçê está aprovado!"));
} else {
  console.log(chalk.red("voçê precisa fazer a prova de recuperação!"));
}

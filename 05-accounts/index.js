// modulos externos
const inquirer = require("inquirer");
const chalk = require("chalk");

const log = console.log;
const warning = chalk.hex("#FFA500");
const error = chalk.bgRed;

// modulos internos
const fs = require("fs");

operation();

function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que voçê deseja fazer?",
        choices: [
          "Criar Conta",
          "Consultar Saldo",
          "Depositar",
          "Sacar",
          "Sair"
        ]
      }
    ])
    .then((answer) => {
      const action = answer["action"];
      if (action === "Criar Conta") {
        createAccount();
      } else if (action === "Depositar") {
      } else if (action === "Sacar") {
      } else if (action === "Sair") {
        log(chalk.bgBlue.white("Obrigado por usar o Accounts!"));
        process.exit();
      }
    })
    .catch((err) => log(err));
}

// create an account
function createAccount() {
  log(chalk.bgGreen.white("Parabéns por escolher o nosso banco!"));
  log(chalk.green("Defina as opções da sua conta a seguir."));
  buildAccount();
}

let i = 0;
function buildAccount() {
  i++;
  if (i > 3) {
    log(error("Infelizmente não foi possível criar sua conta!"));
    process.exit();
  }
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite um nome para sua conta"
      }
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      console.info(accountName);

      if (accountName === "") {
        log(warning("Não é possível criar uma conta sem definir, um nome!"));
        buildAccount();
        return;
      }

      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        log(chalk.bgRed.white("Esta conta já existe, escolha outro nome!"));
        buildAccount();
        return;
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance": "0"}',
        function (err) {
          log(err);
        }
      );

      log(chalk.green("Parabéns, sua conta foi criada com sucesso!"));
      operation();
    })
    .catch((err) => log(err));
}

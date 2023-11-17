// modulos externos
const inquirer = require("inquirer");
const chalk = require("chalk");

const log = console.log;

const success = chalk.bgGreen;
const info = chalk.bgBlue;
const warning = chalk.bgYellow.black;
const error = chalk.bgRed;
const bold = chalk.bold.black;

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
        deposit();
      } else if (action === "Consultar Saldo") {
        getAccountBalance();
      } else if (action === "Sacar") {
        withDraw();
      } else if (action === "Sair") {
        log(info("Obrigado por usar o Accounts!"));
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
        log(warning("Não é possível criar uma conta sem nome!"));
        buildAccount();
        return;
      }

      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        log(error("Esta conta já existe, escolha outro nome!"));
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

      log(success("Parabéns, sua conta foi criada com sucesso!"));
      operation();
    })
    .catch((err) => log(err));
}

// add an amount to user account
function deposit() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?"
      }
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      // verify if account exists
      if (!checkAccount(accountName)) {
        return deposit();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Quanto voçê deseja depositar?"
          }
        ])
        .then((answer) => {
          const amount = answer["amount"];

          // add an amount
          addAmount(accountName, amount);
          operation();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    log(error("Esta conta não existe, escolha outro nome!"));
    return false;
  }

  return true;
}

function addAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    log(warning("Atenção!! Digite um valor para prosseguir com a operação!"));
    return deposit();
  }

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  );

  log(
    success(`Foi depositado o valor de ${bold(`R$${amount}`)}, na sua conta`)
  );
}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf8",
    flag: "r"
  });

  return JSON.parse(accountJSON);
}

// show account balance
function getAccountBalance() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?"
      }
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      // verify if account exists
      if (!checkAccount(accountName)) {
        return getAccountBalance();
      }

      const accountData = getAccount(accountName);

      log(
        success(
          `Olá ${bold(accountName)}, o saldo da sua conta é de ${bold(
            `R$${accountData.balance}`
          )} `
        )
      );

      operation();
    })
    .catch((err) => log(err));
}

// withdraw an amount from user account
function withDraw() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual o nome da sua conta?"
      }
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      // verify if account exists
      if (!checkAccount(accountName)) {
        return withDraw();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Quando voçê deseja sacar?"
          }
        ])
        .then((answer) => {
          const amount = answer["amount"];

          removeAmount(accountName, amount);
        })
        .catch((err) => log(err));
    })
    .catch((err) => log(err));
}

function removeAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    log(warning("Atenção!! Digite um valor para prosseguir com a operação!"));
    return withDraw();
  }

  if (accountData.balance < amount) {
    log(error("Valor indisponível"));
    return withDraw();
  }

  accountData.balance =
    parseFloat(accountData.balance) - parseFloat(amount);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      log(err);
    }
  );

  log(
    success(`Foi realizado um saque de ${bold(`R$${amount} da sua conta!`)} `)
  );
  operation();
}

const chalk = require("chalk");
const yargs = require("yargs");
const {
  addContact,
  searchContacts,
  loadContacts,
  removeContact,
} = require("./contacts");

yargs.scriptName(`${chalk.yellow("Contact Manager App:")}`);
yargs.usage(`$0 ${chalk.red("<commmand>")} ${chalk.green("[args]")}`);
yargs.version(`${chalk.green("0.0.1")}`);
// create command
yargs.command({
  command: "create",
  aliases: ["c"],
  describe: `${chalk.green("[Create new contact]")}`,
  builder: {
    name: {
      alias: "n",
      type: "string",
      describe: `${chalk.green("[Name of new contact]")}`,
      demandOption: true,
    },
    phone: {
      alias: "p",
      type: "string",
      describe: `${chalk.green("[Phone of new contact]")}`,
      demandOption: true,
    },
  },
  handler: function ({ name, phone }) {
    addContact(name, phone);
  },
});

// list command
yargs.command({
  command: "list",
  aliases: ["l"],
  describe: `${chalk.green("[Listing the saved contacts]")}`,
  builder: {
    search: {
      alias: "s",
      type: "string",
      describe: `${chalk.green("[Search contact]")}`,
    },
  },
  handler: function ({ search }) {
    const contacts = loadContacts();

    if (contacts.length === 0)
      return console.log(chalk.red("\nContacts list is empty!"));

    console.log(chalk.green("\nResult:"));

    // if don't want search
    if (!search) return console.table(contacts);

    // if want search
    const result = searchContacts(search);

    result.length > 0 && console.table(result);
  },
});

// remove command
yargs.command({
  command: "remove",
  aliases: ["r"],
  describe: `${chalk.green("[Remove contact]")}`,
  builder: {
    id: {
      alias: "i",
      type: "string",
      describe: `${chalk.green("[Delete contact by id]")}`,
      demandOption: true,
    },
  },
  handler: function ({ id }) {
    return removeContact(id);
  },
});

yargs.parse();

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

//
const pathFile = path.join(__dirname, "/contact.json");

const addContact = (name, phone) => {
  const contacts = loadContacts();
  const isDuplicate = contacts.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
  const newContact = { id: new Date().getTime().toString(), name, phone };

  if (!isDuplicate) {
    contacts.push(newContact);
    saveContact(contacts);
    console.log(chalk.green("Contact Saved!"));
  } else {
    console.log(chalk.red("Contact Is Duplicated!"));
  }

  contacts.push(newContact);
};

const loadContacts = () => {
  try {
    const file = fs.readFileSync(pathFile);
    const contacts = JSON.parse(file);

    return contacts;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const saveContact = async (contacts) => {
  fs.writeFileSync(pathFile, JSON.stringify(contacts));
};

const searchContacts = (search) => {
  const contacts = loadContacts();

  const result = [];
  contacts.find((c) => {
    c.name.toLowerCase().search(search.toLowerCase()) != -1 && result.push(c);
    c.phone.toLowerCase().search(search.toLowerCase()) != -1 && result.push(c);
  });

  if (result.length > 0) {
    return result;
  } else {
    console.log(chalk.red(`This Contact Not Existed!`));
    return [];
  }
};

const removeContact = (id) => {
  const contacts = loadContacts();

  const index = contacts.findIndex((contact) => contact.id === id);


  if (index !== -1) {
    console.log(`${chalk.yellow('Contact:')} ${chalk.blue(JSON.stringify(contacts[index]))}`)

    contacts.splice(index, 1);
    saveContact(contacts);

    return console.log(chalk.green("Contact Removed!"));
  } else {
    console.log(chalk.red(`Contact Not Founded!`));
  }
};

module.exports = {
  addContact,
  searchContacts,
  loadContacts,
  removeContact,
};

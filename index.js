// const argv = require("yargs").argv;
const contacts = require("./contacts.js");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      break;

    case "get":
      const searchedContact = await contacts.getContactById(id);
      console.log(searchedContact);
      break;

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(newContact);
      break;

    case "remove":
          const removedContact = await contacts.removeContact(id)
          console.log(removedContact)
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "rsKkOQUi80UsgVPCcLZZW" });
// invokeAction({ action: "add", name: "sasha", email: "sasa", phone: "222" });
invokeAction({ action: "remove", id: "qdggE76Jtbfd9eWJHrssH" });

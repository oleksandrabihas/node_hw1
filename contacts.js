const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  try {
      const contactsList = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contactsList);
  } catch (error) {
    console.log("Error parsing contacts", error);
  }
}

async function getContactById(id) {
  try {
    const contactsList = await listContacts();
    return contactsList.find((contact) => contact.id === id) || null;
  } catch (error) {
    console.log("Error parsing contact by id", error);
  }
}

async function addContact(contact) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...contact,
    };
    console.log(newContact);
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.log("Error adding contact", error);
  }
}

async function removeContact(id) {
  try {
    const contacts = await listContacts();
    console.log(id);
      const index = contacts.findIndex((item) => item.id === id);
    if (index !== -1) {
     const removedObject = contacts.splice(index, 1);
     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
     console.log(removedObject[0]);
     return removedObject[0];
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error removing contact", error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};

const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  try {
      const contactsList = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contactsList);
  } catch (error) {
    error.message = "Error parsing contacts";
    console.log("Error parsing contacts", error);
    throw error
  }
}

async function getContactById(id) {
  try {
    const contactsList = await listContacts();
    return contactsList.find((contact) => contact.id === id) || null;
  } catch (error) {
    error.message = "Error parsing contact by id";
    console.log("Error parsing contact by id", error);
    throw error
  }
}

async function addContact(contact) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...contact,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    error.message = "Error adding contact"; 
    console.log("Error adding contact", error);
    throw error
  }
}

async function removeContact(id) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === id);
    if (index !== -1) {
     const [removedObject] = contacts.splice(index, 1);
     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
     return removedObject;
    } else {
      return null;
    }
  } catch (error) {
    error.message = "Error removing contact";
    console.log("Error removing contact", error);
    throw error
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};

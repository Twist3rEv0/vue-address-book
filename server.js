const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// load contacts from JSON file
let contacts = loadContactsFromFile();

/**
 * API GET for return all contacts
 */
app.get("/api/contact/:contactId?", (req, res) => {
  // if "contactId" is passed into url param, then retrieve contact (with the specific id) from contact list and returns it in json (into an array)
  if (req.params?.contactId) {
    const contactObjById = contacts?.find(
      (contact) => contact.id === req.params.contactId
    );

    // check if "contactObjById" has been founded
    if (!contactObjById) {
      return res.status(404).send("Contact not found");
    }

    // return a contact data retrieved from contact list
    res.json([contactObjById]);
  }

  // return a contacts list in json
  res.json(contacts);
});

/**
 * API POST for add new contact
 */
app.post("/api/contact", (req, res) => {
  // get contact data from body request
  const newContact = req.body;

  // add a new contact into array "contacts"
  contacts.push(newContact);

  // save contact list updated into json file
  saveContactsToFile(res);

  // return a contact added in json
  res.json(newContact);
});

/**
 * API PUT for edit contact
 */
app.put("/api/contact/:contactId", (req, res) => {
  // check if "contactId" is passed into url param
  if (!req.params?.contactId) {
    return res.status(400).send("Contact id not found");
  }

  // get contact data to edit from body request
  const contactToEdit = req.body;

  // I cycle through the contact list until I find the contact object to modify to replace it with the one into body request
  for (let i = 0; i < contacts?.length; i++) {
    if (contacts[i]?.id === req.params.contactId) {
      contacts[i] = JSON.parse(JSON.stringify(contactToEdit));
      break;
    }
  }

  // save contact list updated into json file
  saveContactsToFile(res);

  // return a contact updated in json
  res.json(contactToEdit);
});

/**
 * API PUT for edit contact
 */
app.delete("/api/contact/:contactId", (req, res) => {
  // check if "contactId" is passed into url param
  if (!req.params?.contactId) {
    return res.status(400).send("Contact id not found");
  }

  // delete the contact from the contact list using a "filter" (so that the array is filtered excluding the id passed in the url param)
  contacts = contacts.filter((contact) => contact.id !== req.params.contactId);

  // save contact list updated into json file
  saveContactsToFile();

  // return a contact updated in json
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

/**
 * Function for load and retrieve contact list from JSON file
 */
function loadContactsFromFile() {
  try {
    // get JSON file
    const filePath = path.join(__dirname, "data", "addressBookList.json");
    const data = fs.readFileSync(filePath, "utf8");

    // return a contacts list from JSON file
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading contacts file:", error);
    return [];
  }
}

// Function for saving contact list updated in a JSON file
function saveContactsToFile(res) {
  try {
    // get JSON file
    const filePath = path.join(__dirname, "data", "addressBookList.json");

    // save contacts list updated into a JSON file
    const jsonData = JSON.stringify(contacts, null, 2);
    fs.writeFileSync(filePath, jsonData, "utf8");
  } catch (error) {
    console.error("Error writing contacts file:", error);
    return res.status(500);
  }
}

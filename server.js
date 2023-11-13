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
app.get("/api/contacts", (req, res) => {
  // return a contacts list in json
  res.json(contacts);
});

/**
 * API POST for add new contact
 */
app.post("/api/contacts", (req, res) => {
  // get data from body request
  const newContact = req.body;

  // add a new contact into array "contacts"
  contacts.push(newContact);

  // save contacts list updated
  saveContactsToFile();

  // return a contact added in json
  res.json(newContact);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// function for load contacts from JSON file
function loadContactsFromFile() {
  try {
    // get JSON file
    const filePath = path.join(
      __dirname,
      "src",
      "data",
      "addressBookList.json"
    );
    const data = fs.readFileSync(filePath, "utf8");

    // return a contacts list from JSON file
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading contacts file:", error);
    return [];
  }
}

// function for save contacts in a JSON file
function saveContactsToFile() {
  try {
    // get JSON file
    const filePath = path.join(
      __dirname,
      "src",
      "data",
      "addressBookList.json"
    );

    // save contacts list updated into a JSON file
    const jsonData = JSON.stringify(contacts, null, 2);
    fs.writeFileSync(filePath, jsonData, "utf8");
  } catch (error) {
    console.error("Error writing contacts file:", error);
  }
}

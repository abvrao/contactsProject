// JavaScript Code for Contacts App

// Select DOM elements
const mainPage = document.getElementById("main-page");
const createPage = document.getElementById("create-page");
const createButton = document.getElementById("create-button");
const cancelButton = document.getElementById("cancel-button");
const contactForm = document.getElementById("contact-form");
const contactsTableBody = document.querySelector("#contacts-table tbody");

// Initialize contacts from localStorage
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

// Function to render contacts in the table
function renderContacts() {
  contactsTableBody.innerHTML = ""; // Clear existing rows
  contacts.forEach((contact, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${contact.firstName} ${contact.lastName}</td>
      <td>${contact.phone}</td>
    `;
    contactsTableBody.appendChild(row);
  });
}

// Function to show the create contact page
function showCreatePage() {
  mainPage.classList.add("hidden");
  createPage.classList.remove("hidden");
}

// Function to show the main page
function showMainPage() {
  createPage.classList.add("hidden");
  mainPage.classList.remove("hidden");
}

// Handle form submission to create a new contact
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const firstName = document.getElementById("first-name").value.trim();
  const lastName = document.getElementById("last-name").value.trim();
  const phoneNumber = document.getElementById("phone-number").value.trim();

  // Validate inputs
  if (!firstName || !lastName || !phoneNumber) {
    alert("All fields are required.");
    return;
  }

  // Create and save the new contact
  const newContact = { firstName, lastName, phone: phoneNumber };
  contacts.push(newContact);
  localStorage.setItem("contacts", JSON.stringify(contacts));

  // Clear the form and return to the main page
  contactForm.reset();
  showMainPage();
  renderContacts();
});

// Handle cancel button
cancelButton.addEventListener("click", () => {
  contactForm.reset();
  showMainPage();
});

// Event listener for create button
createButton.addEventListener("click", showCreatePage);

// Initial render of contacts
renderContacts();

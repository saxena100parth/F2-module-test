// Array to store form data
let formData = [];

// Function to update the table with form data
function updateTable() {
  let table = document.getElementById("formDataTable");
  table.innerHTML =
    "<tr><th>ID</th><th>Name</th><th>Age</th><th>Grade</th><th>Degree</th><th>Email</th><th>Actions</th></tr>";

  for (let i = 0; i < formData.length; i++) {
    let data = formData[i];
    let row = "<tr>";
    row += "<td>" + data.id + "</td>";
    row += "<td>" + data.name + "</td>";
    row += "<td>" + data.age + "</td>";
    row += "<td>" + data.grade + "</td>";
    row += "<td>" + data.degree + "</td>";
    row += "<td>" + data.email + "</td>";
    row +=
      '<td><button onclick="updateObject(' +
      i +
      ')"><img src="edit.svg" alt="Edit"/></button> ';
    row +=
      '<button onclick="deleteObject(' +
      i +
      ')"><img src="delete.svg" alt="Delete" /></button></td>';
    row += "</tr>";
    if (data.id !== null) {
      table.innerHTML += row;
    }
  }
}

// Function to update the form fields with object values
function updateFormFields(index) {
  let data = formData[index];
  document.getElementById("id").value = data.id;
  document.getElementById("name").value = data.name;
  document.getElementById("age").value = data.age;
  document.getElementById("grade").value = data.grade;
  document.getElementById("degree").value = data.degree;
  document.getElementById("email").value = data.email;
}

// Function to update an object in the array
function updateObject(index) {
  // Update the form fields with object values
  updateFormFields(index);

  // Attach submitUpdateForm function to the update form's submit event
  document
    .getElementById("myForm")
    .addEventListener("submit", submitUpdateForm);
  document.getElementById("submit").value = "Edit Student";
  // Function to handle form submission for update
  function submitUpdateForm(event) {
    event.preventDefault(); // Prevent form submission

    // Get the updated values from the form fields
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let grade = document.getElementById("grade").value;
    let degree = document.getElementById("degree").value;
    let email = document.getElementById("email").value;

    // Update the object in the array
    formData[index].id = id;
    formData[index].name = name;
    formData[index].age = age;
    formData[index].grade = grade;
    formData[index].degree = degree;
    formData[index].email = email;

    // Reset the form
    document.getElementById("myForm").reset();

    // Update the table
    updateTable();

    // Remove the event listener for the update form submission
    document.getElementById("submit").value = "Add Student";
    document
      .getElementById("myForm")
      .removeEventListener("submit", submitUpdateForm);
  }
}

// Function to delete an object from the array
function deleteObject(index) {
  formData.splice(index, 1);

  // Update the table
  updateTable();
}

// Function to handle form submission
function submitForm(event) {
  event.preventDefault(); // Prevent form submission
  let id = document.getElementById("id").value;
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let grade = document.getElementById("grade").value;
  let degree = document.getElementById("degree").value;
  let email = document.getElementById("email").value;

  // Create an object with form data
  let formDataObj = {
    id: id,
    name: name,
    age: age,
    grade: grade,
    degree: degree,
    email: email,
  };

  // Add the object to the array
  formData.push(formDataObj);

  // Reset the form
  document.getElementById("myForm").reset();

  // Update the table
  updateTable();
}

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", handleSearch);

function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredData = formData.filter((data) => {
    const { name, email, degree } = data;
    return (
      name.toLowerCase().includes(searchTerm) ||
      email.toLowerCase().includes(searchTerm) ||
      degree.toLowerCase().includes(searchTerm)
    );
  });

  displayTable(filteredData);
}

function displayTable(data) {
  // Clear existing table
  let table = document.getElementById("formDataTable");
  table.innerHTML = "";
  table.innerHTML =
    "<tr><th>ID</th><th>Name</th><th>Age</th><th>Grade</th><th>Degree</th><th>Email</th><th>Actions</th></tr>";

  // Render filtered data
  for (let i = 0; i < data.length; i++) {
    let rowData = data[i];
    let row = "<tr>";
    row += "<td>" + rowData.id + "</td>";
    row += "<td>" + rowData.name + "</td>";
    row += "<td>" + rowData.age + "</td>";
    row += "<td>" + rowData.grade + "</td>";
    row += "<td>" + rowData.degree + "</td>";
    row += "<td>" + rowData.email + "</td>";
    row +=
      '<td><button onclick="updateObject(' +
      i +
      ')"><img src="edit.svg" alt="Edit"/></button> ';
    row +=
      '<button onclick="deleteObject(' +
      i +
      ')"><img src="delete.svg" alt="Delete" /></button></td>';
    row += "</tr>";
    table.innerHTML += row;
  }
}

// Attach submitForm function to the form's submit event
document.getElementById("myForm").addEventListener("submit", submitForm);

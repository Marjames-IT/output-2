let records = JSON.parse(localStorage.getItem("records")) || [

];

let editIndex = -1;

function displayRecords() {

    let table = document.getElementById("recordTable");

    table.innerHTML = "";

    records.forEach((record, index) => {

        let row = table.insertRow();

        row.innerHTML = `
            <td>${record.firstName}</td>
            <td>${record.middleName}</td>
            <td>${record.lastName}</td>
            <td>${record.age}</td>
            <td>
                <button onclick="deleteRecord(${index})">
                    Delete
                </button>

                <button onclick="editRecord(${index})">
                    Edit
                </button>
            </td>
        `;
    });
}

function insertRecord() {

    let firstName = document.getElementById("firstName").value.trim();
    let middleName = document.getElementById("middleName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let age = document.getElementById("age").value;

    if (firstName === "" || middleName === "" ||
        lastName === "" || age === "") {

        alert("Please complete all fields.");
        return;
    }

    if (Number(age) <= 0) {
        alert("Please enter a valid age.");
        return;
    }

    let newRecord = {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        age: Number(age)
    };

    if (editIndex === -1) {

        records.push(newRecord);

        alert("Record successfully inserted!");

    } else {

        records[editIndex] = newRecord;

        alert("Record successfully updated!");

    }

    clearForm();
    displayRecords();
}

function clearForm() {

    document.getElementById("firstName").value = "";
    document.getElementById("middleName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("age").value = "";

    editIndex = -1;

    document.getElementById("insertBtn").innerText = "Insert";
}

function deleteRecord(index) {

    if (confirm("Are you sure you want to delete this record?")) {

        records.splice(index, 1);

        displayRecords();

        clearForm();
    }
}

function editRecord(index) {

    let record = records[index];

    document.getElementById("firstName").value = record.firstName;
    document.getElementById("middleName").value = record.middleName;
    document.getElementById("lastName").value = record.lastName;
    document.getElementById("age").value = record.age;

    editIndex = index;

    document.getElementById("insertBtn").innerText = "Update";
}

function clearRecords() {

    if (confirm("Are you sure you want to clear all records?")) {

        records = [];

        localStorage.removeItem("records");

        displayRecords();

        clearForm();

        alert("All records have been cleared!");
    }
}

function sortRecords() {

    let field = document.getElementById("sortField").value;
    let order = document.getElementById("sortOrder").value;

    if (field === "" || order === "") {
        return;
    }

    records.sort((a, b) => {

        let result;

        if (field === "age") {

            result = a.age - b.age;

        } else {

            result = a[field].localeCompare(b[field]);

        }

        return order === "ascending" ? result : -result;

    });

    displayRecords();
}

function saveToLocalStorage() {

    localStorage.setItem("records", JSON.stringify(records));

    alert("Records successfully saved to Local Storage!");
}

document.getElementById("sortField").addEventListener("change", sortRecords);

document.getElementById("sortOrder").addEventListener("change", sortRecords);

displayRecords();
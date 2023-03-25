 // Replace this URL with the URL for your own JSON data
 // var url = "https://script.google.com/macros/s/AKfycbxZNGA4B-BvZimbstK6HyfSJGMU4-Yvl8UCnp_cBnnIDsIsB0srIQUCHp4km_4OzILEEg/exec";
var url = "https://api.ssh-net.eu.org/";


var originalData = []; // To store the original data from JSON
var filteredData = []; // To store the filtered data
var pageSize = 10; // The number of rows to display per page
var currentPage = 0; // The index of the current page
var startRow = 0; // The index of the first row to display
var endRow = pageSize; // The index of the last row to display

fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    originalData = data; // Store the original data for filtering later
    createTableHeader(); // Create the table header dynamically
    filterTable(); // Filter the table initially
  })
  .catch(function(error) {
    console.error(error);
  });

// Function to create the table header dynamically
function createTableHeader() {
  var tableHeader = document.getElementById("tableHeader");
  var headerRow = document.createElement("tr");
  var keys = Object.keys(originalData[0]);
  for (var i = 0; i < keys.length; i++) {
    var cell = document.createElement("th");
    cell.appendChild(document.createTextNode(keys[i]));
    headerRow.appendChild(cell);
  }
  tableHeader.appendChild(headerRow);
}

// Function to filter the table based on search input and current page
function filterTable() {
  var input = document.getElementById("searchInput").value.toLowerCase();
  filteredData = originalData.filter(function(obj) {
    return Object.keys(obj).some(function(key) {
      return obj[key].toString().toLowerCase().includes(input);
    });
  });

  // Update the start and end rows based on the current page
  startRow = currentPage * pageSize;
  endRow = Math.min(startRow + pageSize, filteredData.length);

  var tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  // Create data rows dynamically for the current page
  for (var i = startRow; i < endRow; i++) {
    var row = document.createElement("tr");
    for (var j = 0; j < Object.keys(filteredData[i]).length; j++) {
      var key = Object.keys(filteredData[i])[j];
      var cell = document.createElement("td");
      cell.appendChild(document.createTextNode(filteredData[i][key]));
      row.appendChild(cell);
    }
    tableBody.appendChild(row);
  }

  // Disable or enable the "Previous" and "Next" buttons based on the current page
  var prevBtn = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");
  prevBtn.disabled = (currentPage === 0);
  nextBtn.disabled = (endRow >= filteredData.length);
}

// Function to go to the previous page
function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    filterTable();
  }
}

// Function to go to the next page
function nextPage() {
  if (endRow < filteredData.length) {
   currentPage++;
   filterTable();
  }
}

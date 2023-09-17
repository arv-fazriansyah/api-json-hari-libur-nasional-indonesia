// Wrap your code in a function to avoid global scope pollution
function setupTable() {
  const url = "https://cors.fzrnsyh.workers.dev/https://api.fazriansyah.eu.org/";
  const originalData = [];
  let filteredData = [];
  const pageSize = 10;
  let currentPage = 0;
  let startRow = 0;
  let endRow = pageSize;

  // Cache frequently accessed DOM elements
  const searchInput = document.getElementById("searchInput");
  const tableHeader = document.getElementById("tableHeader");
  const tableBody = document.getElementById("tableBody");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  // Function to create the table header dynamically
  function createTableHeader() {
    const headerRow = document.createElement("tr");
    const keys = Object.keys(originalData[0]);
    for (const key of keys) {
      const cell = document.createElement("th");
      cell.textContent = key;
      headerRow.appendChild(cell);
    }
    tableHeader.appendChild(headerRow);
  }

  // Function to filter the table based on search input and current page
  function filterTable() {
    const input = searchInput.value.toLowerCase();
    filteredData = originalData.filter(function (obj) {
      return Object.keys(obj).some(function (key) {
        return obj[key].toString().toLowerCase().includes(input);
      });
    });

    startRow = currentPage * pageSize;
    endRow = Math.min(startRow + pageSize, filteredData.length);

    tableBody.innerHTML = "";

    for (let i = startRow; i < endRow; i++) {
      const row = document.createElement("tr");
      for (const key in filteredData[i]) {
        if (Object.hasOwnProperty.call(filteredData[i], key)) {
          const cell = document.createElement("td");
          cell.textContent = filteredData[i][key];
          row.appendChild(cell);
        }
      }
      tableBody.appendChild(row);
    }

    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = endRow >= filteredData.length;
  }

  function prevPage() {
    if (currentPage > 0) {
      currentPage--;
      filterTable();
    }
  }

  function nextPage() {
    if (endRow < filteredData.length) {
      currentPage++;
      filterTable();
    }
  }

  // Fetch data and initialize the table
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      originalData.push(...data);
      createTableHeader();
      filterTable();
    })
    .catch((error) => {
      console.error(error);
    });

  // Return the functions that need to be accessible from outside
  return {
    prevPage,
    nextPage,
  };
}

// Call the setupTable function to initialize the table
const table = setupTable();

 // Replace this URL with the URL for your own JSON data
  var url = "https://script.google.com/macros/s/AKfycbyKaES3UrD2_gNOYV-TSZsKxbLIFp2BkHfmZ3Uy94JWOmphrIsM4ASEOiKTjAxZzJanXg/exec";


  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var tableHeader = document.getElementById("tableHeader");
      var tableBody = document.getElementById("tableBody");


      // Create header row dynamically based on the keys in the first object
      var headerRow = document.createElement("tr");
      var keys = Object.keys(data[0]);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var th = document.createElement("th");
        th.appendChild(document.createTextNode(key));
        headerRow.appendChild(th);
      }
      tableHeader.appendChild(headerRow);


      // Create data rows dynamically
      for (var i = 0; i < data.length; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < keys.length; j++) {
          var key = keys[j];
          var cell = document.createElement("td");
          cell.appendChild(document.createTextNode(data[i][key]));
          row.appendChild(cell);
        }
        tableBody.appendChild(row);
      }
    })
    .catch(function(error) {
      console.error(error);
    });

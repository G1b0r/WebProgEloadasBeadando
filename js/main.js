let data = [
    { name: "Kovács Péter", height: 180, weight: 75 },
    { name: "Szabó Anna", height: 165, weight: 60 },
    { name: "Nagy Béla", height: 175, weight: 80 }
  ];
  
  function createRow() {
    let name = prompt("Add meg a nevet:");
    let height = prompt("Add meg a magasságot:");
    let weight = prompt("Add meg a súlyt:");
  
    if (name && height && weight) {
      data.push({ name, height, weight });
      renderTable();
    }
  }
  
  function renderTable() {
    const tbody = document.querySelector("#dataTable tbody");
    tbody.innerHTML = "";
  
    data.forEach((row, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.name}</td>
        <td>${row.height}</td>
        <td>${row.weight}</td>
        <td>
          <button onclick="deleteRow(${index})">Törlés</button>
          <button onclick="updateRow(${index})">Frissítés</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }
  
  function deleteRow(index) {
    data.splice(index, 1);
    renderTable();
  }
  
  function updateRow(index) {
    const name = prompt("Add meg az új nevet:", data[index].name);
    const height = prompt("Add meg az új magasságot:", data[index].height);
    const weight = prompt("Add meg az új súlyt:", data[index].weight);
  
    if (name && height && weight) {
      data[index] = { name, height, weight };
      renderTable();
    }
  }
  
  function searchTable() {
    const searchValue = document.querySelector("#searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#dataTable tbody tr");
  
    rows.forEach(row => {
      const name = row.cells[0].textContent.toLowerCase();
      if (name.indexOf(searchValue) !== -1) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }
  
  function sortTable(columnIndex) {
    const rows = Array.from(document.querySelectorAll("#dataTable tbody tr"));
    const sortedRows = rows.sort((rowA, rowB) => {
      const cellA = rowA.cells[columnIndex].textContent;
      const cellB = rowB.cells[columnIndex].textContent;
      
      return isNaN(cellA) ? cellA.localeCompare(cellB) : cellA - cellB;
    });
  
    const tbody = document.querySelector("#dataTable tbody");
    tbody.innerHTML = "";
    sortedRows.forEach(row => tbody.appendChild(row));
  }
  
  document.addEventListener("DOMContentLoaded", renderTable);




  function storeData() {
    let name = prompt("Add meg a neved:");
    localStorage.setItem("userName", name);
    alert("Az adatot mentettük: " + name);
  }
  
  function retrieveData() {
    let name = localStorage.getItem("userName");
    document.getElementById("localStorageData").textContent = name ? "Mentett név: " + name : "Nincs mentett adat.";
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      document.getElementById("geoLocation").textContent = "Geolocation nem támogatott a böngészőben.";
    }
  }
  
  function showPosition(position) {
    document.getElementById("geoLocation").textContent = 
      "Szélesség: " + position.coords.latitude + 
      " Hosszúság: " + position.coords.longitude;
  }

  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);
    ev.target.appendChild(draggedElement);
  }

  function drawCanvas() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
  
    ctx.fillStyle = "#0000FF";
    ctx.fillRect(20, 20, 150, 75);
  }

  function generateDataTable() {
    const tableBody = document.querySelector('#dataTable tbody');
    for (let i = 0; i < 5; i++) {
      const row = document.createElement('tr');
      const rowNumber = document.createElement('td');
      rowNumber.textContent = i + 1;
      row.appendChild(rowNumber);
  
      for (let j = 0; j < 5; j++) {
        const cell = document.createElement('td');
        cell.textContent = Math.floor(Math.random() * 100);
        row.appendChild(cell);
      }
  
      // Minden sorra kattintható eseményt adunk, hogy kiválaszthassuk a sort a Chart.js diagramhoz
      row.addEventListener('click', () => updateChart(i));
      tableBody.appendChild(row);
    }
  }
  
  // Kiválasztott sor adatainak frissítése a vonaldiagramon
  function updateChart(rowIndex) {
    const table = document.getElementById('dataTable');
    const row = table.rows[rowIndex + 1]; // Az első sor a fejléc, így az index +1
  
    // Kiválasztjuk a sor adatainak értékeit
    const data = [];
    for (let i = 1; i < row.cells.length; i++) {
      data.push(parseInt(row.cells[i].textContent));
    }
  
    // Frissítjük a Chart.js diagramot
    chart.data.datasets[0].data = data;
    chart.update();
  }
  
  // Inicializáljuk a Chart.js diagramot
  const ctx = document.getElementById('lineChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Adat 1', 'Adat 2', 'Adat 3', 'Adat 4', 'Adat 5'],
      datasets: [{
        label: 'Választott sor',
        data: [0, 0, 0, 0, 0],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  
  // Oldal betöltésekor a táblázatot generáljuk
  window.onload = () => {
    generateDataTable();
  };
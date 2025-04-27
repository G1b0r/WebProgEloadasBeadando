$(document).ready(function() {
    const code = "BBB123abc456"; // Azonosító, a Neptun kód és személyes kulcs
  
    // Adatok lekérdezése (Read)
    function loadData() {
      $.ajax({
        url: "http://gamf.nhely.hu/ajax2/",
        method: "GET",
        data: {
          op: "read",
          code: code
        },
        success: function(response) {
          let tableContent = "";
          const data = response.list;
          data.forEach(item => {
            tableContent += `<tr>
                              <td>${item.id}</td>
                              <td>${item.name}</td>
                              <td>${item.height}</td>
                              <td>${item.weight}</td>
                              <td><button class="updateBtn" data-id="${item.id}">Módosítás</button>
                              <button class="deleteBtn" data-id="${item.id}">Törlés</button></td>
                            </tr>`;
          });
          $("#dataTable tbody").html(tableContent);
        },
        error: function() {
          alert("Hiba történt az adatok lekérése során.");
        }
      });
    }
  
    // Create: Új adat hozzáadása
    $("#createForm").submit(function(event) {
      event.preventDefault();
      const name = $("#name").val();
      const height = $("#height").val();
      const weight = $("#weight").val();
  
      if (name.length > 30 || height <= 0 || weight <= 0) {
        alert("Érvénytelen adatok!");
        return;
      }
  
      $.ajax({
        url: "http://gamf.nhely.hu/ajax2/",
        method: "POST",
        data: {
          op: "create",
          name: name,
          height: height,
          weight: weight,
          code: code
        },
        success: function(response) {
          loadData();
          alert("Adat hozzáadva!");
        },
        error: function() {
          alert("Hiba történt az adat hozzáadása során.");
        }
      });
    });
  
    // Update: Adat módosítása
    $("#updateForm").submit(function(event) {
      event.preventDefault();
      const id = $("#updateId").val();
      const name = $("#updateName").val();
      const height = $("#updateHeight").val();
      const weight = $("#updateWeight").val();
  
      if (name.length > 30 || height <= 0 || weight <= 0) {
        alert("Érvénytelen adatok!");
        return;
      }
  
      $.ajax({
        url: "http://gamf.nhely.hu/ajax2/",
        method: "POST",
        data: {
          op: "update",
          id: id,
          name: name,
          height: height,
          weight: weight,
          code: code
        },
        success: function(response) {
          loadData();
          alert("Adat módosítva!");
        },
        error: function() {
          alert("Hiba történt az adat módosítása során.");
        }
      });
    });
  
    // Delete: Adat törlése
    $("#deleteForm").submit(function(event) {
      event.preventDefault();
      const id = $("#deleteId").val();
  
      $.ajax({
        url: "http://gamf.nhely.hu/ajax2/",
        method: "POST",
        data: {
          op: "delete",
          id: id,
          code: code
        },
        success: function(response) {
          loadData();
          alert("Adat törölve!");
        },
        error: function() {
          alert("Hiba történt az adat törlése során.");
        }
      });
    });
  
    // Oldal betöltésekor adatokat töltünk be
    loadData();
  });
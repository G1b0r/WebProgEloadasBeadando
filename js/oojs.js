class Task {
    constructor(id, description) {
      this.id = id;
      this.description = description;
      this.completed = false;
    }
  
    // Feladat befejezése
    complete() {
      this.completed = true;
    }
  
    // Feladat visszaállítása
    uncomplete() {
      this.completed = false;
    }
  }
  
  // TodoApp osztály
  class TodoApp {
    constructor() {
      this.tasks = [];  // A feladatok tárolása
      this.taskId = 0;  // Egyedi ID generálás a feladatokhoz
    }
  
    // Új feladat hozzáadása
    addTask(description) {
      const task = new Task(this.taskId++, description);
      this.tasks.push(task);
      this.renderTasks();
    }
  
    // Feladat törlése
    deleteTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
      this.renderTasks();
    }
  
    // Feladatok renderelése (megjelenítése)
    renderTasks() {
      const listElement = document.getElementById('todoList');
      listElement.innerHTML = '';  // Előzőleg megjelenített feladatok törlése
  
      this.tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.textContent = task.description;
        
        if (task.completed) {
          listItem.style.textDecoration = 'line-through';
        }
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Törlés';
        deleteButton.onclick = () => this.deleteTask(task.id);
  
        listItem.appendChild(deleteButton);
        listElement.appendChild(listItem);
      });
    }
  }
  
  // Inicializáljuk az alkalmazást
  const app = new TodoApp();
  
  // Az új feladat hozzáadása
  document.getElementById('addTodoButton').addEventListener('click', () => {
    const input = document.getElementById('todoInput');
    const description = input.value.trim();
    if (description) {
      app.addTask(description);
      input.value = '';  // Ürítjük a bemeneti mezőt
    }
  });
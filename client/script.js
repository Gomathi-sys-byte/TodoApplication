document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const todoItems = document.getElementById("todo-items");

  // Add a new task
  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    if (title.trim() === "" || description.trim() === "") {
      alert("Both fields are required!");
      return;
    }

    // Create a new list item
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${title}: ${description}</span>
      <div>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </div>
    `;

    // Edit functionality
    li.querySelector(".edit").addEventListener("click", () => {
      document.getElementById("title").value = title;
      document.getElementById("description").value = description;
      li.remove();
    });

    // Delete functionality
    li.querySelector(".delete").addEventListener("click", () => {
      li.remove();
    });

    // Append the new task to the list
    todoItems.appendChild(li);

    // Clear the form
    todoForm.reset();
  });
});

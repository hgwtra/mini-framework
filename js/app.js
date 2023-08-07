let todoApp = null;

class TodoApp {
  constructor() {
    loadState();

    // Extract specific properties from the 'state' object using object destructuring
    // 'userAgent', 'appVersion', and 'platform' are ignored, and the rest of the properties are stored in 'cleanState'
    const { userAgent, appVersion, platform, ...cleanState } = state;

    this.routes = [
      { path: "#/", filter: "" },
      { path: "#/active", filter: "active" },
      { path: "#/completed", filter: "completed" },
    ];

    // Set the 'state' property of the class to the 'cleanState' extracted from the 'state' object
    this.state = cleanState;

    // Initialize various class properties to null
    this.input = null;
    this.list = null;
    this.clear = null;
    this.checkAllBox = null;
    this.checkAllLabel = null;
    this.filters = null;
    this.edit = null;

    // Bind the methods of the class to the instance to ensure they have access to the correct 'this' context
    this.handleNewTodo = this.handleNewTodo.bind(this);
    this.handleChangeTodoText = this.handleChangeTodoText.bind(this);
    this.handleChangeTodoText = this.handleChangeTodoText.bind(this);
    this.handleTodoTextClick = this.handleTodoTextClick.bind(this);
    this.handleRemoveTodo = this.handleRemoveTodo.bind(this);
    this.handleTodoCheckBox = this.handleTodoCheckBox.bind(this);
    this.handleCheckAll = this.handleCheckAll.bind(this);
    this.handleClearChecked = this.handleClearChecked.bind(this);
    this.handleLinkChange = this.handleLinkChange.bind(this);

    // Hide the footer element with class 'footer' on page load
    const footer = document.querySelector(".footer");
    footer.style.display = "none";

    // Call the 'init' method to set up event listeners and initialize some elements
    this.init();

    // Call the 'navigate' method with the current page from the state
    // to render the correct view based on the current route
    this.navigate(this.state.page);
  }

  handleNewTodo(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      this.add();
    }
  }

  handleRemoveTodo(event) {
    const targetElement = event.target;
    const todoId = this.getId(getParent(targetElement));

    this.delete(todoId);
  }

  handleTodoCheckBox(event) {
    const targetElement = event.target;
    const todoId = this.getId(getParent(targetElement));

    this.updateToggle(todoId);

    this.render();
    saveState(this.state);
  }

  // Event handler for handling clicks on todo text
  handleTodoTextClick(event) {
    const targetElement = event.target;
    let parent = getParent(targetElement);
    let todo = this.getTodo(this.getId(parent));

    // Toggle 'editing' class for inline editing
    if (!parent.classList.contains("completed")) {
      parent.classList += " " + "editing";
    } else {
      parent.classList = "editing";
    }

    this.edit = createStructure({
      tag: "input",
      attri: ["class", "edit"],
    });

    this.edit.value = todo.text;

    // Add event listeners for handling input changes
    addEvent("keypress", this.edit, this.handleChangeTodoText);
    addEvent("blur", this.edit, this.handleChangeTodoText);

    // Append the input element to the parent and focus on it
    createChild(parent, this.edit);
    this.edit.focus();
    saveState(this.state);
  }

  // Event handler for handling changes in todo text during editing
  handleChangeTodoText(event) {
    if (this.edit == null) {
      return;
    }
    if (event.key == "Enter" || event.key == "TAB" || event.type == "blur") {
      event.preventDefault();

      const targetElement = event.target;

      // Remove event listeners for input changes
      removeEvent("blur", targetElement, this.handleChangeTodoText);
      removeEvent("keypress", targetElement, this.handleChangeTodoText);

      // Get the trimmed text from the input element
      const text = this.edit.value.trim();

      // Get the parent element and remove the input element
      let parent = getParent(targetElement, 1);
      removeChild(parent, this.edit);
      this.edit = null;

      // Call the 'change' method to update the todo text
      this.change(text, this.getId(parent));
    }

    saveState(this.state);
  }

  handleClearChecked(event) {
    this.state.todo = this.state.todo.filter((todo) => todo.completed == false);

    saveState(this.state);
    this.render();
  }

  handleCheckAll(event) {
    const targetElement = event.target;
    const ch = targetElement.checked;

    this.state.todo.forEach((todo) => {
      todo.completed = ch;
    });

    saveState(this.state);
    this.render();
  }

  // Event handler for handling changes in route links
  handleLinkChange(event) {
    event.preventDefault();
    const targetElement = event.target;

    // Call the 'navigate' method with the target link's hash to navigate to the corresponding route
    this.navigate(targetElement.hash);
  }

  init() {
    // Get references to various elements in the DOM
    this.input = document.getElementsByClassName("new-todo")[0];
    this.list = document.getElementsByClassName("todo-list")[0];
    this.count = document.getElementsByClassName("todo-count")[0];
    this.clear = document.getElementsByClassName("clear-completed")[0];
    this.checkAllBox = document.getElementById("toggle-all");
    this.checkAllLabel = document.querySelector(".main label");
    this.filters = document.getElementsByClassName("filters")[0];

    // Check if all required elements are found in the DOM, and display an error message if any are missing
    if (
      !this.input ||
      !this.list ||
      !this.count ||
      !this.clear ||
      !this.checkAllBox ||
      !this.checkAllLabel ||
      !this.filters
    ) {
      console.error("Todo input or todo list element not found.");
      return;
    }

    // Add event listeners to various elements
    addEvent("keypress", this.input, this.handleNewTodo);
    addEvent("click", this.clear, this.handleClearChecked);
    addEvent("change", this.checkAllBox, this.handleCheckAll);

    // Get all links under the 'filters' element and add event listeners to handle route changes
    let links = document.querySelectorAll(".filters a");
    for (let i = 0; i < links.length; i++) {
      let a = links[i];
      addEvent("click", a, this.handleLinkChange);
    }
  }

  add() {
    const todoText = this.input.value.trim();
    if (todoText !== "") {
      const todo = { id: Date.now(), text: todoText, completed: false };
      this.state.todo.push(todo);

      this.input.value = "";
      this.checkAllBox.checked = false;

      saveState(this.state);
      this.render();

      // Show the footer element with class 'footer' after the first todo is added
      const footer = document.querySelector(".footer");
      footer.style.display = "block";
    }
  }

  // Method to update the text of a todo in the state and re-render the todos
  change(todoText, todoId) {
    if (todoText == "") {
      this.delete(id);
      return;
    }
    let data = this.getTodo(todoId);

    data.text = todoText;

    saveState(this.state);
    this.render();
  }

  delete(todoId) {
    this.state.todo = this.state.todo.filter(
      (todo) => todo.id !== parseInt(todoId)
    );

    saveState(this.state);
    this.render();

    // Hide the footer element with class 'footer' when the last todo is deleted
    const footer = document.querySelector(".footer");
    footer.style.display = this.state.todo.length === 0 ? "none" : "block";
  }

  updateToggle(todoId) {
    let data = this.getTodo(todoId);
    data.completed = !data.completed;
  }

  getTodo(todoId) {
    return this.state.todo.find((todo) => todo.id === parseInt(todoId));
  }

  getId(element) {
    return element.getAttribute("data-id");
  }

  navigate(url) {
    if (url == "/" || url == "") {
      redirect(this.routes[0].path);
      return;
    }
    redirect(url);
    this.state.page = url;
    const route = this.routes.find((route) => route.path === url);
    if (route == undefined) {
      this.state.filter = "";
    } else {
      this.state.filter = route.filter;
    }
    document.getElementsByClassName("selected")[0].classList = "";

    // Highlight the selected filter link based on the current route
    let links = document.getElementsByTagName("a");
    if (this.state.filter == "") {
      links[0].classList = "selected";
    } else if (this.state.filter == "active") {
      links[1].classList = "selected";
    } else {
      links[2].classList = "selected";
    }

    saveState(this.state);
    this.render();
  }

  renderCount() {
    const items = this.state.todo.length;

    if (items === 0) {
      // Hide some elements when there are no todos
      this.clear.setAttribute("hidden", "true");
      this.filters.setAttribute("hidden", "true");
      this.count.setAttribute("hidden", "true");

      this.state.hideInfo = true;
      this.state.hideClearCompletedButton = true;

      // Hide the footer element with class 'footer' when there are no todos
      const footer = document.querySelector(".footer");
      footer.style.display = "none";
      return;
    } else {
      // Show elements when there are todos
      this.filters.removeAttribute("hidden");
      this.count.removeAttribute("hidden");
      this.state.hideInfo = false;
    }

    const left = this.state.todo.filter(
      (todo) => todo.completed === false
    ).length;
    const word = left === 1 ? "item" : "items";

    // Update the count of active todos
    this.count.innerHTML = `<strong>${left}</strong> ${word} left`;

    const checked = this.state.todo.filter(
      (todo) => todo.completed === true
    ).length;

    // Show or hide the 'Clear completed' button based on the number of completed todos
    if (checked <= 0 && this.state.hideClearCompletedButton === false) {
      this.clear.setAttribute("hidden", "true");
      this.state.hideClearCompletedButton = true;
    } else if (checked > 0 && this.state.hideClearCompletedButton === true) {
      this.clear.removeAttribute("hidden");
      this.state.hideClearCompletedButton = false;
    }

    saveState(this.state);
  }

  render() {
    this.list.innerHTML = "";

    // Render the count of active todos
    this.renderCount();

    let data = this.state.todo;

    // Filter the todos based on the selected filter
    if (this.state.filter == "active") {
      data = data.filter((obj) => obj.completed === false);
    } else if (this.state.filter == "completed") {
      data = data.filter((obj) => obj.completed === true);
    }

    // Render each todo in the list
    data.forEach((todo) => {
      const cl = todo.completed ? "completed" : "";
      let check = createStructure({
        tag: "input",
        attri: ["class", "toggle", "type", "checkbox"],
      });
      let text = createStructure({
        tag: "label",
        children: [todo.text],
      });

      let del = createStructure({
        tag: "button",
        attri: ["class", "destroy"],
      });

      addEvent("click", del, this.handleRemoveTodo);
      addEvent("change", check, this.handleTodoCheckBox);
      addEvent("dblclick", text, this.handleTodoTextClick);

      check.checked = cl;

      const li = createStructure({
        tag: "li",
        attri: ["data-id", todo.id, "class", cl],
        children: [
          createStructure({
            tag: "div",
            attri: ["class", "view"],
            children: [check, text, del],
          }),
        ],
      });

      this.list.appendChild(li);
    });
  }
}

// Call the 'DOMContentLoaded' event listener to initialize the 'TodoApp' class on page load
document.addEventListener("DOMContentLoaded", () => {
  todoApp = new TodoApp();

  // Save the state when the user leaves the page or refreshes it
  document.addEventListener("beforeunload", function () {
    saveState(todoApp.state);
  });
});

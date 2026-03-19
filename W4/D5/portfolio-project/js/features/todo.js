function initTodo() {

    const input = document.getElementById("todo-input");
    const addBtn = document.getElementById("todo-add-btn");
    const list = document.getElementById("todo-list");
    const emptyMsg = document.getElementById("todo-empty");

    if (!input || !addBtn || !list) {
        console.log("Todo elements not found");
        return;
    }

    let todos = JSON.parse(localStorage.getItem("portfolio-todos")) || [];

    function saveTodos() {
        localStorage.setItem("portfolio-todos", JSON.stringify(todos));
    }

    function renderTodos() {
        list.innerHTML = "";

        if (todos.length === 0) {
            if (emptyMsg) emptyMsg.style.display = "block";
        } else {
            if (emptyMsg) emptyMsg.style.display = "none";
        }

        todos.forEach(function (todo, index) {
            const li = document.createElement("li");
            li.style.cssText = "display:flex; align-items:center; justify-content:space-between; gap:12px; padding:16px; border-radius:12px; border:1px solid #e5e7eb; background:#fff; box-shadow:0 1px 3px rgba(0,0,0,0.07); margin-bottom:8px;";

            const leftDiv = document.createElement("div");
            leftDiv.style.cssText = "display:flex; align-items:center; gap:12px; flex:1; min-width:0;";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = todo.done;
            checkbox.style.cssText = "width:18px; height:18px; cursor:pointer; accent-color:#6366f1; flex-shrink:0;";
            checkbox.addEventListener("change", function () {
                todos[index].done = checkbox.checked;
                saveTodos();
                renderTodos();
            });

            const text = document.createElement("span");
            text.style.cssText = "color:#1f2937; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:15px;" +
                (todo.done ? " text-decoration:line-through; color:#9ca3af;" : "");
            text.textContent = todo.text;

            leftDiv.appendChild(checkbox);
            leftDiv.appendChild(text);

            const delBtn = document.createElement("button");
            delBtn.textContent = "✕";
            delBtn.style.cssText = "color:#f87171; font-weight:bold; font-size:14px; background:none; border:none; cursor:pointer; flex-shrink:0; padding:4px 8px; border-radius:6px;";
            delBtn.addEventListener("mouseover", function () {
                delBtn.style.color = "#ef4444";
                delBtn.style.background = "#fee2e2";
            });
            delBtn.addEventListener("mouseout", function () {
                delBtn.style.color = "#f87171";
                delBtn.style.background = "none";
            });
            delBtn.addEventListener("click", function () {
                todos.splice(index, 1);
                saveTodos();
                renderTodos();
            });

            li.appendChild(leftDiv);
            li.appendChild(delBtn);
            list.appendChild(li);
        });
    }

    function addTodo() {
        const text = input.value.trim();
        if (text === "") {
            input.focus();
            return;
        }
        todos.push({ text: text, done: false });
        saveTodos();
        renderTodos();
        input.value = "";
        input.focus();
    }

    addBtn.addEventListener("click", addTodo);
    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") addTodo();
    });

    renderTodos();
    console.log("Todo initialized successfully");
}
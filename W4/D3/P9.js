const asyncFetchBtn = document.getElementById("asyncFetchBtn");
const output = document.getElementById("output");
const postIdInput = document.getElementById("postIdInput");

asyncFetchBtn.addEventListener("click", async function () {
    const id = postIdInput.value.trim();
    
    if (id === "") {
        output.textContent = "Post Id is required";
        return;
    }
    const numericId = Number(id);
    if (isNaN(numericId) || numericId < 1 || numericId > 100) {
        output.textContent = "Enter valid id between 1 and 100";
        return;
    }
    try {
        output.textContent = "Fetching Post...";
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/" + numericId);
        if (!response.ok) {
            throw new Error("HTTP error: " + response.status);
        }
        const data = await response.json();
        output.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        output.textContent = "Error: " + error.message;
    }
});
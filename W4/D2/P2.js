//CreateElement() & appendChild()

const List = document.getElementById("list");
let Counter = 1;

document.getElementById("addBtn").addEventListener("click", function () {
    const li = document.createElement("li");
    .textContent("No elements to delete")
    li.textContent = "Item" + Counter++;
    List.appendChild(li);
});
document.getElementById("rmBtn").addEventListener("click", function () {
    if (List.lastElementChild){
        List.removeChild(List.lastElementChild);
    }
    console.log("No elements to delete")
});
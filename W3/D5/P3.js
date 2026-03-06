// Mouseover Event
const hoverBox = document.getElementById("hoverBox");

hoverBox.addEventListener("mouseover",function(){
    hoverBox.textContent = "Mouse is over Me";
    hoverBox.style.backgroundColor = "lightyellow";
});

hoverBox.addEventListener("mouseout",function(){
    hoverBox.textContent = "Hover over Me";
    hoverBox.style.backgroundColor = "white";
});
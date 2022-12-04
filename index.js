const menu = document.getElementById("menu");
console.log('hello world')
Array.from(document.getElementsByClassName("menu-item"))
    .forEach((item, index) => {
        console.log(index)
        item.onmouseover = () => {
            menu.dataset.activeIndex = index;
        }
    });
console.log(Array.from(document.getElementsByClassName("menu-item")))

const handleMouseMove = (e) => {
    
}



document.getElementById("cards").onmousemove = (e) => {
    for(const card of document.querySelectorAll(".card")) {
        const rect = card.getBoundingClientRect(), x = e.clientX - rect.left, y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`)
        card.style.setProperty("--mouse-y", `${y}px`)
    }
}
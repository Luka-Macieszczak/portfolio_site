const linkDestinations = ['https://github.com/Luka-Macieszczak/DirectX', 'https://github.com/Luka-Macieszczak/DirectXServer']


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

const cards = document.getElementById("cards")

cards.onmousemove = (e) => {
    for(const card of document.querySelectorAll(".card")) {
        const rect = card.getBoundingClientRect(), x = e.clientX - rect.left, y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`)
        card.style.setProperty("--mouse-y", `${y}px`)
    }
}

for(const card of document.querySelectorAll(".card")) {
        card.style.setProperty('--opacity-tech', '0')
}

let links = Array.from(document.getElementsByClassName('link'))

links.forEach((link, index) => {
    let x = `${((index%3) - 1) * 25}vw`
    link.style.setProperty('--opacity', '1')
    link.style.setProperty('--pos-x', x)
    if( index%3 != 2){
        console.log(index)
        link.onclick = () => {
            window.open(linkDestinations[index])
        }
    }
})

let isDescActive = true;
Array.from(document.getElementsByClassName('card'))
    .forEach((card, index) => {
        card.onclick = () => {
            if(isDescActive){
                card.style.setProperty('--opacity-desc', '0')
                card.style.setProperty('--opacity-tech', '1')
                for(const link of links){
                    link.style.setProperty('--opacity', '0')
                }
                isDescActive = false
            } else {
                card.style.setProperty('--opacity-desc', '1')
                card.style.setProperty('--opacity-tech', '0')
                for(const link of links){
                    link.style.setProperty('--opacity', '1')
                }
                isDescActive = true
            }
        }
    })
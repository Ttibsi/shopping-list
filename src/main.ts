// Make API calls
interface ShoppingItem {
    id: number
    value: string
    completed: boolean
}

// Pass data to html
const app = document.getElementById("app") as HTMLDivElement
if (app) {
    app.innerHTML = `
    <div id="frame">
        <ul id='list'></ul>
    </div>
`
}

fetch("http://localhost:8888/getEntries").then(response => response.json()).then(vals => {
    const list = document.getElementById("list") as HTMLUListElement
    if (list) {
        vals.values.forEach((obj: ShoppingItem) => {
            // console.log("entry is " + obj.id)
            if (obj.completed) {
                list.innerHTML += `<li class="cmpltd"><button class="cmpltd_btn"></button>${obj.value}</li>`
            } else {
                list.innerHTML += `<li><button></button>${obj.value}</li>`
            }
        })
    }
})

// Instead of bullet points, lets do this as a button so we can change
// how it's displayed. In the CSS we remove the li bullet points, and here we
// prepend the text with a button and style it in CSS. If obj.completed === True
// we then add a class to the html button to change how it looks if the item
// is complete. Can we also update the css of the text if the button has is true
// or should we just also give it a class in the JS amending

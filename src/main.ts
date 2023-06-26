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

let val = fetch("http://localhost:8888/getEntries").then(response => response.json()).then(vals => {
    const list = document.getElementById("list") as HTMLUListElement
    if (list) {
        vals.values.forEach((obj: ShoppingItem) => {
            // console.log("entry is " + obj.id)
            list.innerHTML += `<li>${obj.value}</li>`
        })
    }
})

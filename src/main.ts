// Make API calls
class shoppingItem {
    constructor( public id: number, public value: string, public completed: boolean) {}
}

async function getItems(): Promise<shoppingItem[]> {
    try {
        return await fetch("http://localhost:8888/getEntries").then((data) => {
            return JSON.parse(data.body).map((obj: {id: number, value:string, completed:boolean}) => new shoppingItem(obj.id, obj.value, obj.completed)
        })
    } catch (err) {
        console.error(err)
        throw err
    }
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

const list = document.getElementById("list") as HTMLUListElement
if (list) {
    let content = getItems() as Promise<string>
    for (const item in content) {
        list.innerHTML += `<li>${item.value}</li>`
    }
}

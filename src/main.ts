interface ShoppingItem {
    id: number
    value: string
    completed: boolean
}

function generateContainer(obj: ShoppingItem): HTMLDivElement {
    const container = document.createElement("div") as HTMLDivElement
    container.className = "container"

    const input = document.createElement("input")
    input.type = "checkbox"
    input.name = obj.id.toString()
    input.checked = obj.completed

    const label = document.createElement("label")
    label.htmlFor = obj.id.toString()
    label.className = obj.completed ? "complete" : ""
    label.textContent = obj.value

    input.addEventListener("change", (_) => {
        obj.completed = input.checked
        if (obj.completed) {
            fetch(
                "http://localhost:8888/complete?entry_id=" + obj.id.toString(),
                {
                    method: "PUT",
                }
            )
        } else {
            fetch(
                "http://localhost:8888/incomplete?entry_id=" +
                    obj.id.toString(),
                {
                    method: "PUT",
                }
            )
        }

        // Update label
        label.className = obj.completed ? "complete" : ""
    })

    container.append(input)
    container.append(label)
    return container
}

async function sendToBack(name: object) {
    await fetch("http://localhost:8888/insert", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(name),
    })
}

const app = document.getElementById("app")
if (app) {
    const frame = document.createElement("div")
    frame.id = "frame"
    app.appendChild(frame)

    fetch("http://localhost:8888/getEntries")
        .then((response) => response.json())
        .then((vals) => {
            vals.values.forEach((obj: ShoppingItem) => {
                frame.appendChild(generateContainer(obj))
            })
        })

    //TODO: Add entry box and make POST query
    const entry = document.createElement("div")
    entry.className = "container entrybar"

    const txt = document.createElement("input")
    txt.addEventListener("keyup", (event) => {
        if (event.key == "Enter") {
            //TODO: Update front end after this -- don't just refresh because 
            // it's bad practice -- I think I want to get back the same data 
            // fromm this endpoint and then load it into DOM that way
            sendToBack({ new_entry: txt.value })
        }
    })

    entry.append(txt)
    frame.appendChild(entry)
}

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
        console.log("update")
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
}

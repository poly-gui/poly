import { PolyApplication, Window } from "@poly-gui/core"

const app = new PolyApplication({
	transport: { type: "node-stdio" },
})

const instance = app.start()

const window = new Window(app, "main")
window.title = "Poly in TypeScript"
window.width = 600
window.height = 400
await window.show()

await instance

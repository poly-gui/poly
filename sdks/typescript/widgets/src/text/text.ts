import { Text as NpText } from "./text.np.js"
import { PolyWidget, type Widget } from "../widget/widget.js"
import type { FontStyle } from "../style/style.js"
import { FontStyle as FontStyleMsg } from "../style/font-style.np.js"
import type { ApplicationContext } from "@poly-gui/core"
import { ViewStyle as ViewStyleMsg } from "../style/view-style.np.js"

class Text extends PolyWidget {
	public content = ""

	public font: FontStyle = {
		family: "",
		size: 12,
		weight: 400,
	}

	public tw = ""

	// biome-ignore lint/complexity/noUselessConstructor: it is not actually useless lmfao
	constructor(context: ApplicationContext) {
		super(context)
	}

	override descriptor(): Widget {
		const fontStyle = new FontStyleMsg(
			this.font.family,
			this.font.size,
			this.font.weight,
		)
		const viewStyle = new ViewStyleMsg(this.style.padding)
		return new NpText(viewStyle, this.tag, this.content, fontStyle, this.tw)
	}
}

export { Text }

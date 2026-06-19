import type { PolyApplication } from "@poly-gui/core"
import { UpdateWidget } from "../update-widget.np.js"
import { CreateWidget } from "../create-widget.np.js"
import type { ViewStyle } from "../style/style.js"
import type { Widget } from "../rpc/widget/widget.np.js"

type WidgetTag = number

abstract class PolyWidget {
	public readonly tag: WidgetTag

	public style: ViewStyle = {
		padding: 0,
	}

	protected constructor(protected readonly context: PolyApplication) {
		this.tag = context.idRegistry.newId()
	}

	abstract descriptor(): Widget

	public async show({ window }: { window: string }) {
		const msg = new CreateWidget(this.descriptor(), window)
		await this.context.nativeLayer.sendMessage(msg)
	}

	public async update(updater: () => void) {
		updater()
		await this.dispatchUpdate()
		return this
	}

	protected async dispatchUpdate() {
		const msg = new UpdateWidget(this.tag, this.descriptor(), null)
		await this.context.nativeLayer.updateWidget(
			this.tag,
			this.descriptor(),
			null,
		)
	}
}

abstract class WidgetController {
	protected constructor(protected readonly context: ApplicationContext) {}

	public abstract widget(): PolyWidget
}

export { PolyWidget, WidgetController }
export type { Widget }
export type { WidgetTag }

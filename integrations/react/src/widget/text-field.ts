import type { PolyApplication } from "@poly-gui/core"
import type { Widget as RpcMessageWidget } from "@poly-gui/core/rpc/widget/widget.np.js"
import { TextField as RpcMessageTextField } from "@poly-gui/core/rpc/widget/text-field.np.js"
import type { TextFieldChangedEvent } from "@poly-gui/core/rpc/widget/text-field-changed-event.np.js"
import { Widget } from "../widget.js"
import { createReactElement } from "./react.js"

type TextFieldValueChangeCallback = (newValue: string) => void

interface TextFieldProps {
	value: string
	placeholder: string
	onValueChange: TextFieldValueChangeCallback
}

class TextFieldWidget extends Widget<TextFieldProps> {
	public value: string
	public placeholder: string

	private onValueChange: TextFieldValueChangeCallback
	private onValueChangeHandle: number

	constructor(
		context: PolyApplication,
		tag: number,
		{ value, placeholder, onValueChange }: TextFieldProps,
	) {
		super(context, tag)
		this.value = value
		this.placeholder = placeholder
		this.onValueChange = onValueChange
		this.onValueChangeHandle = context.callbackRegistry.newVoidCallback(
			this.onValueChanged.bind(this),
		)
	}

	update({ value, placeholder, onValueChange }: TextFieldProps): void {
		this.value = value
		this.placeholder = placeholder
		this.onValueChange = onValueChange
		this.context.nativeLayer.updateWidget(this.tag, this.descriptor(), null)
	}

	descriptor(): RpcMessageWidget {
		return new RpcMessageTextField(
			this.tag,
			this.placeholder,
			this.value,
			this.onValueChangeHandle,
		)
	}

	private onValueChanged(arg: unknown) {
		const { newValue } = arg as TextFieldChangedEvent
		this.onValueChange(newValue)
	}
}

function TextField(props: TextFieldProps) {
	return createReactElement("textfield", props)
}

export { TextField, TextFieldWidget }
export type { TextFieldValueChangeCallback, TextFieldProps }

import { Style } from "@/types/interfaces";

const createStyledSpan = (style: Style) => {
	const span = document.createElement("span");
	Object.entries(style).forEach(([key, value]) => {
		// @ts-expect-error
		span.style[key as keyof CSSStyleDeclaration] = value.toString();
	});
	return span;
};

export const applyStyle = (selectedStyle: Style) => {
	const selection = window.getSelection();
	if (!selection || !selection.rangeCount) return;

	const range = selection.getRangeAt(0);
	const fragment = range.extractContents();
	const styledSpan = createStyledSpan(selectedStyle);

	styledSpan.appendChild(fragment);
	range.insertNode(styledSpan);

	selection.removeAllRanges();
	selection.addRange(range);
	selection.empty();
};

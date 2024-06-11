import { TextBlock } from "@/types/interfaces";
import { Button } from "@/ui";
import { applyStyle } from "@/utils";
import { ElementRef, FC, useRef, useState } from "react";
import st from "./style.module.scss";

const TextEditor: FC = () => {
	const editorRef = useRef<ElementRef<"div">>(null);
	const [color, setColor] = useState<string>("red");
	const [fontSize, setFontSize] = useState<string>("20px");
	const [backgroundColor, setBackgroundColor] = useState<string>("yellow");

  const exportToJSON = () => {
    const textBlocks: TextBlock[] = [];
    const editor = editorRef.current;
    if (!editor) return;

    const children = editor.childNodes;

    children.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent?.trim() || "";
        if (text) {  // Only proceed if the text is not empty
          const parentElement = node.parentElement;
          if (parentElement) {
            const { color, fontSize, backgroundColor } = window.getComputedStyle(parentElement);

            const lastBlock = textBlocks[textBlocks.length - 1];
            if (
              lastBlock &&
              lastBlock.color === color &&
              lastBlock.fontSize === fontSize &&
              lastBlock.backgroundColor === backgroundColor
            ) {
              lastBlock.text += text;
            } else {
              textBlocks.push({ text, fontSize, color, backgroundColor });
            }
          }
        }
      } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === "SPAN") {
        const text = (node.textContent?.trim() || "");
        if (text) {  // Only proceed if the text is not empty
          const { color, fontSize, backgroundColor } = window.getComputedStyle(node as Element);

          const lastBlock = textBlocks[textBlocks.length - 1];
          if (
            lastBlock &&
            lastBlock.color === color &&
            lastBlock.fontSize === fontSize &&
            lastBlock.backgroundColor === backgroundColor
          ) {
            lastBlock.text += text;
          } else {
            textBlocks.push({ text, fontSize, color, backgroundColor });
          }
        }
      }
    });

    console.log(JSON.stringify(textBlocks, null, 2));
    console.log(textBlocks);
  };

	return (
		<div className={st.block}>
			<div className={st.wrapper}>
				<label>
					<span>Text Color:</span>
					<input
						className={st.input}
						type="text"
						value={color}
						onChange={(e) => setColor(e.target.value)}
					/>
				</label>
				<Button onClick={() => applyStyle({ color })}>Text-color</Button>
			</div>
			<div className={st.wrapper}>
				<label>
					<span>Font Size:</span>
					<input
						type="text"
						className={st.input}
						value={fontSize}
						onChange={(e) => setFontSize(e.target.value)}
					/>
				</label>
				<Button onClick={() => applyStyle({ fontSize })}>Font-size</Button>
			</div>
			<div className={st.wrapper}>
				<label>
					<span>Background Color:</span>
					<input
						type="text"
						className={st.input}
						value={backgroundColor}
						onChange={(e) => setBackgroundColor(e.target.value)}
					/>
				</label>
				<Button onClick={() => applyStyle({ backgroundColor })}>
					Bg-color
				</Button>
			</div>
			<Button className={st.btnJson} onClick={exportToJSON}>
				Export to JSON
			</Button>
			<div
				className={st.textField}
				suppressContentEditableWarning
				contentEditable
				ref={editorRef}
			>
				Edit me!
			</div>
		</div>
	);
};

export default TextEditor;

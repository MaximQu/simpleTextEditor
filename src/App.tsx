import { TextEditor } from "./components";
import st from "./style.module.scss";

const App = () => {
	return (
		<main className="container">
			<h1 className={st.title}>Simple Text Editor</h1>
			<TextEditor />
		</main>
	);
};

export default App;

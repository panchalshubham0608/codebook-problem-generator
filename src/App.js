import React from "react";
import './App.css';
import Homepage from "./Homepage";
import Editor from "./Editor";

export default function App() {
	const [showEditor, setShowEditor] = React.useState(true);

	// construct the UI
	return (
		<div>
			{!showEditor && <Homepage setShowEditor={setShowEditor} />}
			{showEditor && <Editor setShowEditor={setShowEditor} />}
		</div>
	);
}

import React from "react";
import ProblemEditor from "./ProblemEditor";
import Navbar from "./Navbar";
import './App.css';
import { BrowserRouter } from "react-router-dom";
import TestCase from "./TestCase";

export default function App() {
	const [title, setTitle] = React.useState("");
	const [description, setDescription] = React.useState("");
	const [supportedLanguages, setSupportedLanguages] = React.useState([]); // ["c", "cpp", "java", "python"]
	const [testCases, setTestCases] = React.useState([{
		"input": "",
		"output": "",
		"score": 2.0,
		"timeout": 1000, // in milliseconds
		"locked": false,
	}]);


	// handle language change
	const handleLanguageChange = (event) => {
		const target = event.target;
		const value = target.value;
		const checked = target.checked;
		if (checked) {
			setSupportedLanguages([...supportedLanguages, value]);
		} else {
			setSupportedLanguages(supportedLanguages.filter((lang) => lang !== value));
		}
	}

	// adds a new test case
	const addTestCase = ({shouldScroll}) => {
		// add a test case
		setTestCases([...testCases, {
			"input": "",
			"output": "",
			"score": 2.0,
			"timeout": 1000, // in milliseconds
			"locked": false,
		}]);
		// scroll to the bottom
		if (shouldScroll) {
			setTimeout(() => {
				window.scrollTo(0, document.body.scrollHeight);
			}, 100);	
		}
	};

	// delete test case
	const deleteTestCase = (index) => {
		// validate number of test cases
		if (testCases.length <= 1) {
			alert("You must have at least one test case!");
			return;
		}
		// delete test case
		setTestCases(testCases => testCases.filter((_, idx) => idx !== index));
	}
	// update test case
	const updateTestCase = (index, testCase) => setTestCases(testCases => testCases.map((tc, idx) => idx === index ? testCase : tc));


	// constructs the JSON download
	const downloadJSON = () => {
		// check if title is empty
		if (title === "") {
			alert("Title cannot be empty!");
			return;
		}

		// check if description is empty
		if (description === "") {
			alert("Description cannot be empty!");
			return;
		}

		// check if supported languages is empty
		if (supportedLanguages.length === 0) {
			alert("You must select at least one supported language!");
			return;
		}

		// check if test cases are empty
		if (testCases.length === 0) {
			alert("You must have at least one test case!");
			return;
		}

		// construct the JSON
		const problem = {
			"title": title,
			"description": description,
			"supported_languages": supportedLanguages,
			"test_cases": testCases,
			"templates": [],
		};

		// download the JSON
		const element = document.createElement("a");
		const file = new Blob([JSON.stringify(problem)], {type: 'application/json'});
		element.href = URL.createObjectURL(file);
		element.download = "problem.json";
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
		alert("Your download was successful!");		
	}


	// construct the UI
	return (
		<div>
			<BrowserRouter>
				<Navbar addTestCase={addTestCase} downloadJSON={downloadJSON} />
				<div className="container" style={{marginTop: "80px"}}>
					<div className="mb-3">
						<input type="text" className="form-control" id="title" placeholder="Problem title"
							value={title} onChange={event => setTitle(event.target.value)} />
					</div>
					<ProblemEditor description={description} setDescription={setDescription} />
					<div className="mt-3 border rounded p-3">
						<label htmlFor="supported_languages" className="form-label bold">Supported languages</label>
						<div id="supported_languages">
							<div className="form-check form-check-inline">
								<input className="form-check-input" type="checkbox" id="lang_c" value="c" 
									onChange={handleLanguageChange}/>
								<label className="form-check-label" htmlFor="lang_c">C</label>
							</div>
							<div className="form-check form-check-inline">
								<input className="form-check-input" type="checkbox" id="lang_cpp" value="cpp" 
									onChange={handleLanguageChange}/>
								<label className="form-check-label" htmlFor="lang_cpp">C++</label>
							</div>
							<div className="form-check form-check-inline">
								<input className="form-check-input" type="checkbox" id="lang_java" value="java" 
									onChange={handleLanguageChange}/>
								<label className="form-check-label" htmlFor="lang_java">Java</label>
							</div>
							<div className="form-check form-check-inline">
								<input className="form-check-input" type="checkbox" id="lang_python" value="python" 
									onChange={handleLanguageChange}/>
								<label className="form-check-label" htmlFor="lang_python">Python</label>
							</div>
						</div>
					</div>
					<div className="mt-3 border rounded p-3">
						<h4>Test Cases</h4>
						{testCases.map((testCase, index) => {
							return <TestCase key={index} testCase={testCase} index={index}
								deleteTestCase={deleteTestCase} updateTestCase={updateTestCase}/>
						})}
					</div>
				</div>
			</BrowserRouter>
		</div>
	);
}

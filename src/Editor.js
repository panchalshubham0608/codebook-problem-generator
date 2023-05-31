// imports
import React, { useCallback, useEffect } from "react";
import AceEditor from 'react-ace';
import CryptoJS from "crypto-js";
import ProblemEditor from "./ProblemEditor";
import Navbar from "./Navbar";
import TestCase from "./TestCase";
import templates from "./templates";

// Editor component
export default function Editor() {

    const [title, setTitle] = React.useState("");
    const [key, setKey] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [supportedLanguages, setSupportedLanguages] = React.useState([]);
    const [testCases, setTestCases] = React.useState([{
        "input": "",
        "output": "",
        "score": 2.0,
        "timeout": 1000, // in milliseconds
        "locked": false,
    }]);

    // reconstruct the editor design
    useEffect(() => {
        document.body.style.background = "white";
    }, []);

    // construct the mode for ace editor from language
    const propsFromLanguage = useCallback((language) => {
        let props = {text: language, mode: "text"};
        switch (language) {
            case "c": props = {text: "C", mode: "c_cpp"}; break;
            case "cpp": props = {text: "C++", mode: "c_cpp"}; break;
            case "java": props = {text: "Java", mode: "java"}; break;
            case "py": props = {text: "Python", mode: "python"}; break;
            case "js": props = {text: "JavaScript", mode: "javascript"}; break;
            default: props = {text: language, mode: "text"}; break;
        }
        return props;
    }, []);


    // handle language change
    const handleLanguageChange = (event) => {
        const target = event.target;
        const value = target.value;
        const checked = target.checked;
        if (checked) {
            setSupportedLanguages(supportedLanguages => [...supportedLanguages, {
                "language": value,
                "template": templates[value],
                ...propsFromLanguage(value),
            }]);
        } else {
            setSupportedLanguages(supportedLanguages => supportedLanguages.filter(lang => lang.language !== value));
        }
    }

    // adds a new test case
    const addTestCase = ({ shouldScroll }) => {
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

    // update the template
    const updateTemplate = (index, template) => setSupportedLanguages(supportedLanguages => supportedLanguages.map((lang, idx) => idx === index ? {
        "language": lang.language,
        "template": template,
        ...propsFromLanguage(lang.language),
    } : lang));

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
            "supported_languages": supportedLanguages.map(lang => lang.language),
            "test_cases": testCases,
            "templates": supportedLanguages.map(lang => { 
                let obj = {};
                obj[lang.language] = lang.template;
                return obj;
            }),
        };

        // if encryption key is not empty, encrypt the JSON        
        let content = JSON.stringify(problem);
        if (key !== "") {
            content = CryptoJS.AES.encrypt(JSON.stringify(problem), key).toString();
        }

        // download the JSON
        const element = document.createElement("a");
        const file = new Blob([content], { type: 'application/json' });
        element.href = URL.createObjectURL(file);
        element.download = "problem.json" + (key !== "" ? ".enc" : "");
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        alert("Your download was successful!");
    }

    return (
        <>
            <Navbar addTestCase={addTestCase} downloadJSON={downloadJSON} />
            <div className="container" style={{ marginTop: "80px" }}>
                <div className="row mb-3">
                    <div className="col">
                        <input type="text" className="form-control" id="title" placeholder="Problem title"
                            value={title} onChange={event => setTitle(event.target.value)} />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" id="key" placeholder="Encryption key"
                            value={key} onChange={event => setKey(event.target.value)} />
                    </div>
                </div>
                <ProblemEditor description={description} setDescription={setDescription} />
                <div className="mt-3 border rounded p-3">
                    <label htmlFor="supported_languages" className="form-label bold">Supported languages</label>
                    <div id="supported_languages">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="lang_c" value="c"
                                onChange={handleLanguageChange} />
                            <label className="form-check-label" htmlFor="lang_c">C</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="lang_cpp" value="cpp"
                                onChange={handleLanguageChange} />
                            <label className="form-check-label" htmlFor="lang_cpp">C++</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="lang_python" value="py"
                                onChange={handleLanguageChange} />
                            <label className="form-check-label" htmlFor="lang_python">Python</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="lang_java" value="java"
                                onChange={handleLanguageChange} />
                            <label className="form-check-label" htmlFor="lang_java">Java</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="lang_js" value="js"
                                onChange={handleLanguageChange} />
                            <label className="form-check-label" htmlFor="lang_js">JavaScript</label>
                        </div>
                    </div>
                </div>
                <div className="mt-3 border rounded p-3">
                    <h4>Templates</h4>
                    <div className="row">
                        {supportedLanguages.map((lang, index) => {
                            return (
                                <div className="col col-6 p-3" key={lang.language}>
                                    <label htmlFor={`template_${lang.language}`} className="form-label bold">Template for {lang.text}</label>
                                    <AceEditor
                                        mode={lang.mode}
                                        theme="eclipse"
                                        name={`template_${lang.language}`}
                                        fontSize={16}
                                        onChange={code => updateTemplate(index, code)}
                                        value={lang.template}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="mt-3 mb-3 border rounded p-3">
                    <h4>Test Cases</h4>
                    {testCases.map((testCase, index) => {
                        return <TestCase key={index} testCase={testCase} index={index}
                            deleteTestCase={deleteTestCase} updateTestCase={updateTestCase} />
                    })}
                </div>
            </div>
        </>
    );
};

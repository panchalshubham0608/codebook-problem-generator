# CodeBook - Problem Generator
[This app](https://panchalshubham0608.github.io/codebook-problem-generator/) is used to generate problems for [CodeBook application](https://github.com/panchalshubham0608/codebook/pkgs/container/codebook).  
The following shows the template for code-generation
```
{
	"title": "...",
	"description": "...",
	"test_cases": [
		{
			"input": "...",
			"output": "...",
			"score": ...,
			"timeout": "...",
			"locked": [true/false]
		},
		...
	],
	"supported_languages": [
		"c",
		"cpp",
		"java",
		"py"
	],
	"templates": {
		"c": "...",
		"cpp": "...",
		"java": "...",
		"py": "...",
    }
}
```

## Examples
The following examples will help you understand the outcomes.
1. The following problem is about creating a `Hello World!` program.
```
{
    "title": "Hello World!",
    "description": "Write a program to display text `Hello World!`",
    "test_cases":  [
        {
            "input": "",
            "output": "Hello World!",
            "score": 2,
            "timeout": 1000,
            "locked": false
        }
    ],
    "supported_languages": ["c","cpp"],
    "templates": {}
}
```

2. The following problem is about writing a program that sums two numbers.
```
{
    "title": "Add two numbers",
    "description": "Write a program to input two numbers from user and print their sum",
    "supported_languages": [
        "c",
        "cpp",
        "py",
        "java",
        "js"
    ],
    "test_cases": [
        {
            "input": "1 2\n",
            "output": "3\n",
            "score": 2,
            "timeout": 1000,
            "locked": false
        },
        {
            "input": "2 3\n",
            "output": "5\n",
            "score": 2,
            "timeout": 1000,
            "locked": false
        },
        {
            "input": "50 20\n",
            "output": "70\n",
            "score": 2,
            "timeout": 1000,
            "locked": false
        },
        {
            "input": "100 100\n",
            "output": "200\n",
            "score": 2,
            "timeout": 1000,
            "locked": true
        },
        {
            "input": "0 0\n",
            "output": "0\n",
            "score": 2,
            "timeout": 1000,
            "locked": true
        }
    ],
    "templates": {
        "c": "#include <stdio.h>\nint main() {\n    // your code goes here\n    return 0;\n}",
        "cpp": "#include <iostream>\nusing namespace std;\nint main() {\n    // your code goes here\n    return 0;\n}",
        "py": "# your code goes here",
        "java": "public class Main {\n    public static void main(String[] args) {\n        // your code goes here\n    }\n}",
        "js": "// your code goes here"
    }
}
```

## Need help?
Please feel free to write your queries to [shubhampanchal9773@gmail.com](mailto:shubhampanchal9773@gmail.com), I'll be happy to assist you :)


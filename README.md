# CodeBook - Problem Generator
This app is used to generate problems for CodeBook application.  
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
		"python"
	],
	"templates": [
		"c": "...",
		"cpp": "...",
		"java": "...",
		"python": "...",
	]
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
    "templates": []
}
```

2. The following problem is about writing a program that sums two numbers.
```
{
    "title": "Add two numbers",
    "description": "Your task is to complete the function `add_two` which takes two integers and returns their sum.",
    "test_cases": [
        {
            "input": "2 3",
            "output": "5",
            "score": 2, 
            "timeout": 1000,
            "locked": false
        },
        {
            "input": "0 2",
            "output": "2",
            "score": 3, 
            "timeout": 1000,
            "locked": true
        },
    ],
    "supported_languages": ["c"],
    "templates": [
        "c": "
            #include <stdio.h>
            int add_two(int a, int b){
                // write your code here
            }
            int main() {
                int a, b;
                scanf("%d%d", &a, &b);
                printf("%d\n", add_two(a, b));
                return 0;
            }
        ",
    ]
}
```

## Need help?
Please feel free to write your queries to [shubhampanchal9773@gmail.com](mailto:shubhampanchal9773@gmail.com), I'll be happy to assist you :)


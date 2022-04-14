# Markdown Validation

That is my first Node.JS library. <br> It is a simple command-line program which receives a .md file path as parameter and validate each link in the file, if it has any. If, instead of passing a file path, the user pass a directory path, it will validate each link of each .md file in the directory. The output is formatted by default as a list to allow for a better visualization in the command-line: <br>

### Default output:

Links validation results:

File name: file1.md
Link placeholder: {link_placeholder}
⎆ Status: 200 - OK

Link placeholder: {link_placeholder}
⎆ Status: 404 - Not Found

Link placeholder: {link_placeholder}
⎆ Status: Error
⎆ Status: ENOTFOUND

File name: file2.md
Link placeholder: {link_placeholder}
⎆ Status: 200 - OK

Link placeholder: {link_placeholder}
⎆ Status: 301 - Moved Permanently

...but it can also output in JSON format passing the "-j" or "--json" flag: <br>

### JSON output model:

```json
[
  [
    { "filename": "file1.md" },
    {
      "id": 1,
      "placeholder": "<link_placeholder>",
      "url": "https://link1.com.br",
      "status": "200 - OK"
    },
    {
      "id": 2,
      "placeholder": "<link_placeholder>",
      "url": "https://link2.com",
      "status": "200 - OK"
    },
    {
      "id": 3,
      "placeholder": "<link_placeholder>",
      "url": "https://link2.com",
      "status": "404 - Not Found"
    }
  ]
  [
    { "filename": "file2.md" },
    {
      "id": 1,
      "placeholder": "<link_placeholder>",
      "url": "https://link1.com.br",
      "status": "200 - OK"
    },
    {
      "id": 2,
      "placeholder": "<link_placeholder>",
      "url": "httpslink2.com",
      "status": "Error",
      "errorCode": "ERR_INVALID_URL"
    },
  ]
]
```

<br> If you have any suggestions of improvement, please contact me, I'll be really thankful!

# .md Files Link Validation

That is my first Node.JS library. <br> It is a simple <b> command-line program </b>which receives a .md file path as parameter and validate each link in the file, if it has any. <br> If, instead of passing a file path, the user pass a directory path, it will validate each link of each .md file in the directory. <br> The output is formatted by default as a list to allow for a better visualization in the command-line: <br>

### Default output:

<b>Links validation results: </b>

<b>File name: file1.md </b> <br>
Link placeholder: {link_placeholder} <br>
⎆ Status: 200 - OK <br>

Link placeholder: {link_placeholder} <br>
⎆ Status: 404 - Not Found

Link placeholder: {link_placeholder} <br>
⎆ Status: Error <br>
⎆ Status: ENOTFOUND <br> <br>

<b>File name: file2.md</b> <br>
Link placeholder: {link_placeholder} <br>
⎆ Status: 200 - OK <br>

Link placeholder: {link_placeholder} <br>
⎆ Status: 301 - Moved Permanently <br> <br>

<b>...but it can also output in JSON format passing the "-j" or "--json" flag: </b> <br>

### JSON output model:

```json
[
  {
    "filename": "file1.md",
    "links": [
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
  },
  {
    "filename": "file2.md",
    "links": [
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
      }
    ]
  }
]
```

<br> If you have any suggestions of improvement, please contact me, I'll be <b>really</b> thankful! :)

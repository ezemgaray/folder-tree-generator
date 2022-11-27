# FTG - Folder tree generator

Generate a folder tree as a string from a path using terminal or by importing in your ts/js file.

```text
├── folder-tree-generator
│   ├── .editorconfig
│   ├── .gitignore
│   ├── .prettierrc.json
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── index.ts
│   │   ├── terminal
│   │   │   └── index.ts
│   │   ├── utils
│   │   │   ├── drawTreeFromJsonDir.ts
│   │   │   ├── ftg.ts
│   │   │   ├── index.ts
│   │   │   ├── parseDirToJson.ts
│   │   │   └── sortFolder.ts
│   └── tsconfig.json
```

## Install

### Terminal.

`npm i folder-tree-generator -g`

### TS/JS

`npm i folder-tree-generator`

## Usage

### Terminal

No flags to generate tree of the current path

```sh
$ ftg
```

Or adding flags

```sh
$ ftg [options]
```

Help options

```sh
$ ftg --help

Usage: dist [options]

Options:
  -V, --version          output the version number
  -d, --directory [dir]  Directory path. (default: "folder path")
  -f, --folder-only      Draw folders only.
  -s, --sort             Sort alphabetically and put folders first and then files.
  -h, --help             display help for command
```

### Code

```typescript
import { ftg } from 'folder-tree-generator'

// get current path
const path = process.cwd()

const tree = ftg(path)
console.log(tree)
```

## Defaults

### Options

| Terminal           | Code    | Type    | Default                                        | Description                                               |
| ------------------ | ------- | ------- | ---------------------------------------------- | --------------------------------------------------------- |
| sort               | sort    | boolean | false                                          | Sort alphabetically and put folders first and then files. |
| -f, --folders-only | boolean | false   | generate tree only with folders (ignore files) |

## Ignore files/folders

By default ftg ignore the following files and folders

- .vscode
- .DS_Store
- .git
- node_modules
- dist

## TODO

- Unit testing jest
- Add command flags
  - --sort ✅
  - --folder-only ✅
  - --ignore (regex)
  - --export
- add ftg() options
  - sort ✅
  - folderOnly ✅
  - ignore (regex)
- Add "..." if folderOnly = true
- Add comment "# Empty folder" (if the folder is empty literally)
- Interactive terminal

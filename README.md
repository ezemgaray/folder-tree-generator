# FTG - Folder tree generator

Generate a folder tree as a string from a path using terminal or by importing in your ts/js file.

```text
├── folder-tree-generator
│   ├── src
│   │   ├── utils
│   │   │   ├── drawTreeFromJsonDir.ts
│   │   │   ├── index.ts
│   │   │   ├── parseDirToJson.ts
│   │   │   └── sortFolder.ts
│   │   └── index.ts
│   ├── .editorconfig
│   ├── .gitignore
│   ├── .prettierrc.json
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
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

Options:
  -V, --version          output the version number
  -d, --directory [dir]  Directory path. (default: "[current path]")
  -f, --folder-only      Draw folders only.
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

By default ftg ignore the following files and folders

- .vscode
- .DS_Store
- .git
- node_modules
- dist

## TODO

- Add command flags
  - --folder-only
  - --ignore (regex)
  - --export
- Interactive terminal
- add ftg() options
  - folderOnly
  - ignoreRegex
  - ignoreArray

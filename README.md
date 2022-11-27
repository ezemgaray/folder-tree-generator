# Folder Tree Generator - FTG

Generate a folder tree structure using command line or code.

[![Npm package version](https://badgen.net/npm/v/folder-tree-generator)](https://npmjs.com/package/folder-tree-generator)

```text
├── folder-tree-generator
│   ├── .editorconfig
│   ├── .gitignore
│   ├── .prettierrc.json
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── example
│   │   │   └── index.ts
│   │   ├── folder1
│   │   │   ├── folder2
│   │   │   ├── folder3
│   │   │   │   └── folder4
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

## CLI Usage

### Install globally

```sh
npm i folder-tree-generator -g
```

### Run FTG

```sh
$ ftg [options]
```

Help options

```sh
$ ftg --help

Usage: dist [options]

Options:
  -V, --version          output the version number
  -d, --directory [dir]  Directory path. (default: "/Users/ezequielgaray/Projects/GITHUB/folder-tree-generator")
  -f, --folder-only      Draw folders only.
  -s, --sort             Sort alphabetically and put folders first and then files.
  -c, --comments         Show "Empty folder" comment (--folder-only must be false)
  -h, --help             display help for command
```

### NPX

```sh
npx folder-tree-generator [options]
```

## Code Usage

```sh
npm i folder-tree-generator
```

```typescript
import { ftg, FtgOptions } from 'folder-tree-generator'

// get current path
const path = process.cwd()

// ftg options
const options: FtgOptions = { sort: true }

console.log('Tree with options:', options)
console.log('👇')

const tree = ftg(path, options)
console.log(tree)
```

### Options

| Terminal            | Code                | Type    | Default                                                        | Description                                               |
| ------------------- | ------------------- | ------- | -------------------------------------------------------------- | --------------------------------------------------------- |
| -d -directory [dir] | Path is a parameter | string  | **Terminal**: currentFolder - **Code**: path is required param | Folder Path                                               |
| -f, --folders-only  | folderOnly          | boolean | false                                                          | generate tree only with folders (ignore files)            |
| -s, --sort          | sort                | boolean | false                                                          | Sort alphabetically and put folders first and then files. |
| -c, --comments      | comments            | boolean | false                                                          | Show "Empty folder" comment (--folder-only must be false) |

## Ignore files/folders

By default ftg ignore the following files and folders

- .vscode
- .DS_Store
- .git
- node_modules
- dist

## Comments

If files and folders are included and the `comments` option is also added, empty folders will show the comment "# Empty folder"

```sh
├── folder-tree-generator
│   ├── .editorconfig
│   ├── .gitignore
│   ├── .prettierrc.json
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── example
│   │   │   └── index.ts
│   │   ├── folder1
│   │   │   ├── folder2 # Empty folder
│   │   │   ├── folder3
│   │   │   │   └── folder4 # Empty folder
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
- Add comment "# Empty folder" (if you are including files but the folder is empty literally) ✅
- Interactive terminal
- Show available version in terminal ✅
- CHANGELOG.md

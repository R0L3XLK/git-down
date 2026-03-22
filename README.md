# GitDown Selective GitHub Downloader CLI Tool

> Download only the files you need from any GitHub repository — no full clone required.

---

## Table of Contents

- [About](#about)
- [Preview](#preview)
- [Requirements](#requirements)
- [Project Structure](#project-structure)
- [Step-by-Step Setup From Scratch](#step-by-step-setup-from-scratch)
- [GitHub Token Setup](#github-token-setup)
- [package.json Full Config](#packagejson-full-config)
- [auth.js Config](#authjs-config)
- [Global Install](#global-install)
- [Usage](#usage)
- [Keyboard Controls](#keyboard-controls)
- [Troubleshooting](#troubleshooting)
- [How It Works](#how-it-works)
- [Dependencies](#dependencies)
- [Security](#security)
- [License](#license)

---

## About

**GitDown** is an interactive Node.js CLI tool that connects to the GitHub API, fetches the full file tree of any public (or private, with a token) repository, and lets you pick exactly which files to download using a checkbox interface. No cloning. No bloat. Just the files you want.

Works on **Linux**, **macOS**, **Windows**, and **Termux (Android)**.

---

## Preview

```
    ██████╗ ██╗████████╗██████╗  ██████╗ ██╗    ██╗███╗   ██╗
    ██╔════╝ ██║╚══██╔══╝██╔══██╗██╔═══██╗██║    ██║████╗  ██║
    ██║  ███╗██║   ██║   ██║  ██║██║   ██║██║ █╗ ██║██╔██╗ ██║
    ██║   ██║██║   ██║   ██║  ██║██║   ██║██║███╗██║██║╚██╗██║
    ╚██████╔╝██║   ██║   ██████╔╝╚██████╔╝╚███╔███╔╝██║ ╚████║
     ╚═════╝ ╚═╝   ╚═╝   ╚═════╝  ╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═══╝

 🚀 Selective GitHub Downloader CLI Tool
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Description : Download only the files you need from any repo.
  Developer   : R0L3X | R0L3XLK | ROLEX
  Contact     : UNAVAILABLE !
  GitHub      : https://github.com/R0L3XLK
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

? Enter GitHub Repository URL:
```

### File Selection Screen

```
? Select items (Space to select, Enter to confirm):
 ❯ ◯  📄 README.md
   ◯  📁 src
   ◉  📄 src/index.js
   ◉  📄 src/utils.js
   ◯  📁 tests
   ◯  📄 package.json
   ◯  📄 .gitignore
```

### Download Progress

```
GitDown |████████████████████████████████████| 100% || index.js
GitDown |████████████████████████████████████| 100% || utils.js

✨ Success! Files are saved in the 'my-repo' folder.
```

---

## Requirements

- **Node.js** v18 or higher (v20+ recommended)
- **npm** v8 or higher
- A **GitHub Personal Access Token** (optional for public repos, required for private repos and higher API rate limits)

Check your versions:

```bash
node --version
npm --version
```

---

## Project Structure

```
git-down/
├── index.js          # Main CLI application logic (ES Module)
├── auth.js           # Your GitHub Personal Access Token (KEEP PRIVATE)
├── package.json      # Node.js project config and dependencies
├── requirements.txt  # Package list reference
├── .gitignore        # Prevents token from being uploaded to GitHub
└── README.md         # This file
```

---

## Step-by-Step Setup From Scratch

Follow every step below in order. This works on Linux, macOS, and Termux.

---

### Step 1 — Create the Project Folder

```bash
mkdir git-down
cd git-down
```

---

### Step 2 — Initialize the Node.js Project

```bash
npm init -y
```

This creates a `package.json` file automatically.

---

### Step 3 — Install All Required Packages

```bash
npm install @octokit/rest axios chalk@5 cli-progress inquirer@9
```

> **Important:** Use `inquirer@9` specifically. Newer versions (v10+) have arrow key navigation issues in Termux and some Linux terminals. `chalk@5` is also required for ES Module support.

Individual package install commands (if needed separately):

```bash
npm install @octokit/rest
npm install axios
npm install chalk@5
npm install cli-progress
npm install inquirer@9
```

---

### Step 4 — Create the auth.js File

```bash
nano auth.js
```

Paste this inside and replace with your actual GitHub token:

```js
// auth.js
export const GITHUB_TOKEN = 'your_ghp_token_here';
```

Save with `Ctrl + O`, then `Enter`, then `Ctrl + X`.

---

### Step 5 — Create the index.js File

```bash
nano index.js
```

Paste the full ESM source code (see project code) and save.

---

### Step 6 — Configure package.json

```bash
nano package.json
```

Make sure your `package.json` looks exactly like this:

```json
{
  "name": "gitdown",
  "version": "1.0.0",
  "description": "Selective GitHub Downloader CLI Tool",
  "main": "index.js",
  "type": "module",
  "bin": {
    "gitdown": "./index.js"
  },
  "dependencies": {
    "@octokit/rest": "^20.1.1",
    "axios": "^1.6.7",
    "chalk": "^5.3.0",
    "cli-progress": "^3.12.0",
    "inquirer": "^9.2.15"
  }
}
```

> The `"type": "module"` line is required for ES Module `import` syntax to work.
> The `"bin"` section registers the `gitdown` command globally.

---

### Step 7 — Make the Script Executable (Linux / Termux)

```bash
chmod +x index.js
```

---

### Step 8 — Install Globally

This links the `gitdown` command to your system so you can run it from any folder:

```bash
npm install -g .
```

---

## GitHub Token Setup

A Personal Access Token (PAT) lets you access the GitHub API with much higher rate limits and supports private repositories.

1. Go to [https://github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name like `GitDown`
4. Select scopes:
   - No scopes needed for **public repos only**
   - Select **`repo`** scope for **private repos**
5. Click **"Generate token"** and copy it immediately
6. Paste it into `auth.js`:

```js
export const GITHUB_TOKEN = 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
```

| Without Token | With Token |
|--------------|------------|
| 60 API requests/hour | 5,000 API requests/hour |
| Public repos only | Public + Private repos |

---

## package.json Full Config

```json
{
  "name": "gitdown",
  "version": "1.0.0",
  "description": "Selective GitHub Downloader CLI Tool",
  "main": "index.js",
  "type": "module",
  "bin": {
    "gitdown": "./index.js"
  },
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "@octokit/rest": "^20.1.1",
    "axios": "^1.6.7",
    "chalk": "^5.3.0",
    "cli-progress": "^3.12.0",
    "inquirer": "^9.2.15"
  }
}
```

---

## auth.js Config

```js
// auth.js
export const GITHUB_TOKEN = 'YOUR_GITHUB_TOKEN_HERE';
```

Replace `YOUR_GITHUB_TOKEN_HERE` with your real token from GitHub.

---

## Global Install

Install GitDown globally so you can run it from any directory on your machine.

### Method 1 — Local Global Install (Recommended)

From inside the project directory:

```bash
npm install -g .
```

Run from anywhere:

```bash
gitdown
gitdown https://github.com/owner/repo
```

### Method 2 — npm link (Development)

```bash
npm link
```

Run from anywhere:

```bash
gitdown
gitdown https://github.com/owner/repo
```

### Method 3 — Manual PATH Symlink (Linux / Termux)

```bash
chmod +x index.js
ln -s $(pwd)/index.js /usr/local/bin/gitdown
```

Run from anywhere:

```bash
gitdown https://github.com/owner/repo
```

### Update After Code Changes

Whenever you edit `index.js` or `package.json`, refresh the global install:

```bash
npm install -g .
```

### Uninstall

```bash
# If installed via npm install -g .
npm uninstall -g gitdown

# If installed via npm link
npm unlink -g gitdown

# If manually symlinked
rm /usr/local/bin/gitdown
```

---

## Usage

### Interactive Mode (default)

```bash
gitdown
```

You will be prompted to enter a GitHub repository URL, then select files.

### Pass URL Directly

Skip the URL prompt by passing the repo URL as an argument:

```bash
gitdown https://github.com/owner/repository
```

### With or Without .git Suffix

Both formats work — the `.git` suffix is automatically removed:

```bash
gitdown https://github.com/owner/repo
gitdown https://github.com/owner/repo.git
```

### Run Without Global Install

```bash
node index.js https://github.com/owner/repo
```

Or with npm:

```bash
npm start
```

---

## Keyboard Controls

| Key | Action |
|-----|--------|
| `↑` / `↓` Arrow Keys | Navigate up and down the file list |
| `Space` | Select / deselect a file or folder |
| `Enter` | Confirm selection and begin download |
| `Ctrl + C` | Exit the tool at any time |

---

## Troubleshooting

### Error: `Cannot use import statement outside a module`

**Cause:** `package.json` is missing `"type": "module"`.

**Fix:** Open `package.json` and add:

```json
"type": "module"
```

Then re-run:

```bash
npm install -g .
```

---

### Error: `401 Bad credentials`

**Cause:** The token in `auth.js` is wrong, expired, or missing.

**Fix:**
1. Generate a new token at [https://github.com/settings/tokens](https://github.com/settings/tokens)
2. Update `auth.js` with the new token
3. Run `gitdown` again

---

### Arrow Keys / Space Bar Not Working (Termux)

**Cause:** Newer versions of Inquirer (v10+) have rendering issues in Termux.

**Fix:** Downgrade to Inquirer v9:

```bash
npm install inquirer@9
npm install -g .
```

If it still doesn't work, clear the screen first:

```bash
clear
gitdown https://github.com/owner/repo
```

---

### Error: `Permission Denied`

**Fix on Linux/Termux:**

```bash
chmod +x index.js
```

**Fix with sudo (Linux):**

```bash
sudo npm install -g .
```

---

### `gitdown` Command Not Found After Install

**Fix:** Re-link the global command:

```bash
npm uninstall -g gitdown
npm install -g .
```

---

## How It Works

```
User Input (URL)
      │
      ▼
GitHub API (Octokit)
  → Authenticate with token
  → Fetch repository info and default branch
  → Fetch full git tree recursively
      │
      ▼
Inquirer Checkbox UI
  → Display all files and folders
  → User navigates with arrow keys
  → Space to select, Enter to confirm
      │
      ▼
Axios Downloader
  → Downloads each selected blob file via raw GitHub URL
  → Shows real-time progress bar per file (cli-progress)
  → Saves to ./<repo-name>/<original-file-path>
      │
      ▼
Done ✨  Files saved with full directory structure preserved
```

---

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| [`@octokit/rest`](https://github.com/octokit/rest.js) | ^20.1.1 | GitHub REST API client |
| [`inquirer`](https://github.com/SBoudrias/Inquirer.js) | ^9.2.15 | Interactive CLI checkboxes (use v9 for Termux) |
| [`axios`](https://github.com/axios/axios) | ^1.6.7 | HTTP streaming file downloads |
| [`chalk`](https://github.com/chalk/chalk) | ^5.3.0 | Terminal text colors and styling |
| [`cli-progress`](https://github.com/npkgjs/cli-progress) | ^3.12.0 | Download progress bar |

Install all at once:

```bash
npm install @octokit/rest axios chalk@5 cli-progress inquirer@9
```

---

## Security

Your GitHub token is sensitive. Never share it or upload it to GitHub.

Create a `.gitignore` file to protect it:

```bash
nano .gitignore
```

Paste this inside:

```
node_modules/
auth.js
```

This prevents `auth.js` and `node_modules/` from being committed or pushed to any repository.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

> Made by R0L3X | [GitHub](https://github.com/R0L3XLK)

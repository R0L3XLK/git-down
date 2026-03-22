# GitDown — Selective GitHub Downloader CLI Tool

```
    ██████╗ ██╗████████╗██████╗  ██████╗ ██╗    ██╗███╗   ██╗
    ██╔════╝ ██║╚══██╔══╝██╔══██╗██╔═══██╗██║    ██║████╗  ██║
    ██║  ███╗██║   ██║   ██║  ██║██║   ██║██║ █╗ ██║██╔██╗ ██║
    ██║   ██║██║   ██║   ██║  ██║██║   ██║██║███╗██║██║╚██╗██║
    ╚██████╔╝██║   ██║   ██████╔╝╚██████╔╝╚███╔███╔╝██║ ╚████║
     ╚═════╝ ╚═╝   ╚═╝   ╚═════╝  ╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═══╝
```

> Download only the files you need from any GitHub repository — no full clone required.

---

## Table of Contents

- [About](#about)
- [Preview](#preview)
- [Requirements](#requirements)
- [Installation](#installation)
- [GitHub Token Setup](#github-token-setup)
- [Usage](#usage)
- [Global Install](#global-install)
- [How It Works](#how-it-works)
- [Dependencies](#dependencies)
- [License](#license)

---

## About

**GitDown** is an interactive Node.js CLI tool that connects to the GitHub API, fetches the full file tree of any public (or private, with a token) repository, and lets you pick exactly which files to download using a checkbox interface. No cloning. No bloat. Just the files you want.

---

## Preview

### Startup Banner

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

- **Node.js** v18 or higher (v20 recommended)
- **npm** v8 or higher
- A **GitHub Personal Access Token** (optional for public repos, required for private repos and higher rate limits)

Check your versions:

```bash
node --version
npm --version
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/R0L3XLK/GitDown.git
cd GitDown
```

### 2. Install dependencies

```bash
npm install
```

This installs all required packages listed in `package.json`:

```bash
npm install @octokit/rest inquirer axios chalk cli-progress
```

### 3. Configure your GitHub Token

Open `auth.js` and replace the placeholder with your token:

```js
export const GITHUB_TOKEN = 'YOUR_GITHUB_TOKEN_HERE';
```

> See [GitHub Token Setup](#github-token-setup) for how to generate a token.

### 4. Run the tool

```bash
npm start
```

Or directly:

```bash
node index.js
```

---

## GitHub Token Setup

1. Go to [https://github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name (e.g. `GitDown`)
4. Select the **`repo`** scope (for private repos) or no scopes (for public repos only)
5. Click **"Generate token"**
6. Copy the token and paste it into `auth.js`:

```js
export const GITHUB_TOKEN = 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
```

> Without a token, GitHub limits you to 60 API requests per hour. With a token, the limit is 5,000 per hour.

---

## Usage

### Interactive Mode (default)

Run the tool and follow the prompts:

```bash
npm start
```

You will be asked to:
1. Enter the GitHub repository URL
2. Select files using the checkbox interface
3. Press **Enter** to start the download

### Pass URL as Argument

Skip the URL prompt by passing the repo URL directly:

```bash
node index.js https://github.com/owner/repository
```

Example:

```bash
node index.js https://github.com/facebook/react
```

### With `.git` suffix (handled automatically)

Both formats are accepted:

```bash
node index.js https://github.com/owner/repo
node index.js https://github.com/owner/repo.git
```

### Keyboard Controls (File Selection)

| Key | Action |
|-----|--------|
| `↑` / `↓` | Navigate up and down the file list |
| `Space` | Select / deselect a file or folder |
| `Enter` | Confirm selection and begin download |
| `Ctrl + C` | Exit the tool |

---

## Global Install

Install GitDown globally so you can run it from anywhere in your terminal.

### Method 1 — npm link (development)

From inside the project directory:

```bash
npm link
```

Then run it from anywhere:

```bash
gitdown
gitdown https://github.com/owner/repo
```

### Method 2 — npm install -g (from a published package)

If the package is published to npm:

```bash
npm install -g gitdown
```

Then use it globally:

```bash
gitdown
gitdown https://github.com/owner/repo
```

### Method 3 — Add to PATH manually

Make `index.js` executable and symlink it:

```bash
chmod +x index.js
ln -s $(pwd)/index.js /usr/local/bin/gitdown
```

Now run from anywhere:

```bash
gitdown
gitdown https://github.com/owner/repo
```

### Uninstall Global

```bash
# If installed via npm link
npm unlink -g gitdown

# If installed via npm install -g
npm uninstall -g gitdown

# If manually linked
rm /usr/local/bin/gitdown
```

---

## How It Works

```
User Input (URL)
      │
      ▼
GitHub API (Octokit)
  → Fetch default branch
  → Fetch full git tree (recursive)
      │
      ▼
Inquirer Checkbox UI
  → Show all files and folders
  → User selects desired files
      │
      ▼
Axios Downloader
  → Downloads each selected blob file
  → Shows real-time progress bar (cli-progress)
  → Saves to ./<repo-name>/<file-path>
      │
      ▼
Done ✨
```

Files are saved locally in a folder named after the repository, preserving the original directory structure.

---

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| [`@octokit/rest`](https://github.com/octokit/rest.js) | ^20.1.1 | GitHub REST API client |
| [`inquirer`](https://github.com/SBoudrias/Inquirer.js) | ^9.2.15 | Interactive CLI prompts and checkboxes |
| [`axios`](https://github.com/axios/axios) | ^1.6.7 | HTTP streaming file downloads |
| [`chalk`](https://github.com/chalk/chalk) | ^5.3.0 | Terminal text colors and styling |
| [`cli-progress`](https://github.com/npkgjs/cli-progress) | ^3.12.0 | Download progress bar |

Install all at once:

```bash
npm install @octokit/rest inquirer axios chalk cli-progress
```

---

## Project Structure

```
GitDown/
├── index.js       # Main CLI application logic
├── auth.js        # GitHub token configuration
├── package.json   # Project manifest and dependencies
├── LICENSE        # MIT License
└── README.md      # This file
```

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

> Made with by R0L3X | [GitHub](https://github.com/R0L3XLK)

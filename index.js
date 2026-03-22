#!/usr/bin/env node

import { Octokit } from "@octokit/rest";
import inquirer from "inquirer";
import axios from "axios";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import cliProgress from "cli-progress";
import { GITHUB_TOKEN } from "./auth.js";

const octokit = new Octokit({ auth: GITHUB_TOKEN });

// --- DISPLAY BANNER & INFO ---
const showBanner = () => {
    console.clear();
    console.log(chalk.cyan.bold(`
    ██████╗ ██╗████████╗██████╗  ██████╗ ██╗    ██╗███╗   ██╗
    ██╔════╝ ██║╚══██╔══╝██╔══██╗██╔═══██╗██║    ██║████╗  ██║
    ██║  ███╗██║   ██║   ██║  ██║██║   ██║██║ █╗ ██║██╔██╗ ██║
    ██║   ██║██║   ██║   ██║  ██║██║   ██║██║███╗██║██║╚██╗██║
    ╚██████╔╝██║   ██║   ██████╔╝╚██████╔╝╚███╔███╔╝██║ ╚████║
     ╚═════╝ ╚═╝   ╚═╝   ╚═════╝  ╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═══╝
    `));
    console.log(chalk.white.bold(" 🚀 Selective GitHub Downloader CLI Tool"));
    console.log(chalk.gray(" ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
    console.log(chalk.yellow("  Description :") + " Download only the files you need from any repo.");
    console.log(chalk.yellow("  Developer   :") + " R0L3X | R0L3XLK | ROLEX");
    console.log(chalk.yellow("  Contact     :") + " UNAVAILABLE !");
    console.log(chalk.yellow("  GitHub      :") + " https://github.com/R0L3XLK");
    console.log(chalk.gray(" ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"));
};

const progressBar = new cliProgress.SingleBar({
    format: chalk.cyan('GitDown') + ' |' + chalk.cyan('{bar}') + '| {percentage}% || {file}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
});

async function getRepoContent(owner, repo, treeSha) {
    const { data } = await octokit.git.getTree({
        owner, repo, tree_sha: treeSha, recursive: true,
    });
    return data.tree;
}

async function downloadFile(url, filePath, fileName) {
    const directory = path.dirname(filePath);
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }

    try {
        const response = await axios({
            url, method: 'GET', responseType: 'stream'
        });

        const totalLength = response.headers['content-length'] || 0;
        progressBar.start(parseInt(totalLength), 0, { file: fileName });

        const writer = fs.createWriteStream(filePath);
        let downloadedLength = 0;

        response.data.on('data', (chunk) => {
            downloadedLength += chunk.length;
            progressBar.update(downloadedLength);
        });

        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', () => { progressBar.stop(); resolve(); });
            writer.on('error', reject);
        });
    } catch (e) {
        console.log(chalk.red(`\n[!] Error downloading ${fileName}`));
    }
}

async function run() {
    showBanner(); // Call banner at start

    try {
        let repoUrl = process.argv[2];

        if (!repoUrl) {
            const response = await inquirer.prompt([{
                name: "repoUrl",
                message: "Enter GitHub Repository URL:",
                validate: (input) => input.includes("github.com") || "Please enter a valid GitHub URL."
            }]);
            repoUrl = response.repoUrl;
        }

        // Fix: Remove .git from URL if present
        const cleanUrl = repoUrl.replace(".git", "");
        const urlParts = cleanUrl.replace("https://github.com/", "").split("/");
        const owner = urlParts[0];
        const repo = urlParts[1];

        console.log(chalk.yellow(`\n[GitDown] Connecting to ${owner}/${repo}...`));

        const { data: repoData } = await octokit.repos.get({ owner, repo });
        const defaultBranch = repoData.default_branch;
        
        const { data: refData } = await octokit.git.getRef({
            owner, repo, ref: `heads/${defaultBranch}`
        });
        
        const allFiles = await getRepoContent(owner, repo, refData.object.sha);

        const choices = allFiles.map(file => ({
            name: `${file.type === 'tree' ? '📁' : '📄'} ${file.path}`,
            value: file
        }));

        const { selectedItems } = await inquirer.prompt([{
            type: "checkbox",
            name: "selectedItems",
            message: "Select items (Space to select, Enter to confirm):",
            choices: choices,
            pageSize: 15
        }]);

        if (selectedItems.length === 0) return console.log(chalk.red("No items selected. Exiting."));

        const downloadBaseDir = path.join(process.cwd(), repo);
        console.log(chalk.green(`\n[✔] Downloading to: ${downloadBaseDir}\n`));

        for (const item of selectedItems) {
            if (item.type === 'blob') {
                const fileUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/${item.path}`;
                const destPath = path.join(downloadBaseDir, item.path);
                await downloadFile(fileUrl, destPath, path.basename(item.path));
            }
        }

        console.log(chalk.bold.green(`\n\n✨ Success! Files are saved in the '${repo}' folder.`));

    } catch (error) {
        if (error.status === 401) {
            console.error(chalk.red("\n[!] Error: Bad credentials. Please check your token in auth.js"));
        } else {
            console.error(chalk.red("\n[!] GitDown Error:"), error.message);
        }
    }
}

run();

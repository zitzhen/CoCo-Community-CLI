"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
function welcome() {
    const lang = (process.env.LANG || 'en_US').split('_')[0];
    return lang === 'zh' ? '欢迎使用CoCo-Community CLI!' : 'Welcome to the CoCo Community CLI!';
}
function openGitHubRepo() {
    const repoUrl = 'https://github.com/zitzhen/CoCo-Community-CLI';
    console.log('Repository URL:', repoUrl);
    // 根据操作系统选择合适的命令打开浏览器
    let command;
    if (process.platform === 'darwin') { // macOS
        command = `open ${repoUrl}`;
    }
    else if (process.platform === 'win32') { // Windows
        command = `start ${repoUrl}`;
    }
    else { // Linux and others
        command = `xdg-open ${repoUrl}`;
    }
    (0, child_process_1.exec)(command, (error, stdout, stderr) => {
        if (error) {
            console.error('Failed to open browser:', error.message);
            // 在无法打开浏览器的情况下，至少让用户知道URL
            console.log('Please visit the URL manually:', repoUrl);
        }
        else {
            console.log('Opening browser...');
        }
    });
}
// 检查命令行参数
if (process.argv.length > 2) {
    const args = process.argv.slice(2);
    if (args.includes('github')) {
        openGitHubRepo();
        process.exit(0);
    }
}
// 使用
console.log(welcome());

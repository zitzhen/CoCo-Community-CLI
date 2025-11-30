#!/usr/bin/env node
import { exec } from 'child_process';
import * as readline from 'readline';

function welcome() {
    const lang = (process.env.LANG || 'en_US').split('_')[0];
    return lang === 'zh' ? '欢迎使用CoCo-Community CLI!' : 'Welcome to the CoCo Community CLI!';
}

function openGitHubRepo() {
    const repos = [
        { id: 1, name: 'CoCo-Community', url: 'https://github.com/zitzhen/CoCo-Community' },
        { id: 2, name: 'CoCo-Community-Control', url: 'https://github.com/zitzhen/CoCo-Community-Control' },
        { id: 3, name: 'CoCo-Community-CLI', url: 'https://github.com/zitzhen/CoCo-Community-CLI' }
    ];
    
    console.log('请选择要打开的仓库:');
    repos.forEach(repo => {
        console.log(`${repo.id}. ${repo.name}: ${repo.url}`);
    });
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.question('请输入数字选择仓库 (1-3): ', (answer: string) => {
        const choice = parseInt(answer);
        
        if (isNaN(choice) || choice < 1 || choice > 3) {
            console.log('无效输入，请输入 1, 2, 或 3');
            rl.close();
            return;
        }
        
        const selectedRepo = repos.find(repo => repo.id === choice);
        if (selectedRepo) {
            const repoUrl = selectedRepo.url;
            console.log('Repository URL:', repoUrl);
            
            // 根据操作系统选择合适的命令打开浏览器
            let command: string;
            if (process.platform === 'darwin') { // macOS
                command = `open ${repoUrl}`;
            } else if (process.platform === 'win32') { // Windows
                command = `start ${repoUrl}`;
            } else { // Linux and others
                command = `xdg-open ${repoUrl}`;
            }
            
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error('Failed to open browser:', error.message);
                    // 在无法打开浏览器的情况下，至少让用户知道URL
                    console.log('Please visit the URL manually:', repoUrl);
                } else {
                    console.log('Opening browser...');
                }
                rl.close();
            });
        } else {
            console.log('无效选择');
            rl.close();
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
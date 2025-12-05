#!/usr/bin/env node
import { exec } from 'child_process';
import * as readline from 'readline';
import ora from 'ora';
import inquirer from 'inquirer';
import { error } from 'console';
import { METHODS } from 'http';

const lang = (process.env.LANG || 'en_US').split('_')[0];

function search(){
    if (process.argv.length > 3){
        console.log("测试通过");
    }else{
        console.error("缺失搜索关键词 \n 请输入搜索关键词，如下命令：\n cczit search [关键词]");
    }
}



function welcome(lang:string) {
    
    return lang === 'zh' ? '欢迎使用CoCo-Community CLI!' : 'Welcome to the CoCo Community CLI!';
}

function NotFound(lang:string){
    return lang === 'zh' ? '这个命令不存在。' : 'This command does not exist.';
}

function cloneprintlang(lang:string,id:number){
    if (lang === 'zh'){
        if (id === 1){
            console.log("请输入克隆路径...");
        }else if (id === 2){
            console.log("正在克隆项目...");
        } else if (id === 3){
            console.log("克隆成功!");
        } else if (id === 4){
            console.log("错误");
        }
    }else{
        if (id === 1){
            console.log("Please enter the clone path...");
        }else if (id === 2){
            console.log("Cloning the project...");
        } else if (id === 3){
            console.log("Clone successful!");
        } else if (id === 4){
            console.log("Error");
        }
    }
}

function print_repositoryurl(method:string){
    if (method === 'HTTPS'){
        return `git clone https://github.com/`
    } else if (method === 'SSH'){
        return `git clone @github.com:`
    } else if (method === 'GitHub CLI'){
        return `gh repo clone `
    }
}

function print_clonecommand(method:string,repository:string){
    if (repository === 'CoCo-Community'){
        return 'zitzhen/CoCo-Community.git';
    }else if (repository === 'CoCo-Community-Control'){
        return 'zitzhen/CoCo-Community-Control.git';
    }else if (repository === 'CoCo-Community-CLI'){
        return 'zitzhen/CoCo-Community-CLI.git';
    }

}

function run_clone(lang:string,method:string,repository:string,path:string){
    const cloneurl = print_repositoryurl(method)! + print_clonecommand(method,repository) + " " +path;
    console.log(cloneurl);
    
    cloneprintlang(lang, 2); // 正在克隆项目...
    
    exec(cloneurl, (error, stdout, stderr) => {
        if (error) {
            console.error('Error:', error.message);
            cloneprintlang(lang, 4); // 错误
            return;
        }
        if (stderr) {
            console.error('stderr:', stderr);
            cloneprintlang(lang, 4); // 错误
            return;
        }
        console.log(stdout);
        cloneprintlang(lang, 3); // 克隆成功!
    });
}

function Select_cloning_method(lang:string,repository:string,path:string){
    inquirer.prompt([
  {
    type: 'rawlist',
    name: 'cloning_method',
    message: 'Select a cloning method:',
    choices: [
      { name: 'HTTPS'},
      { name: 'SSH'},
      { name: 'GitHub CLI'}
    ],
    default: 0
  }
]).then(answers => {
  const method = answers.cloning_method;
  run_clone(lang,method,repository,path);
}).catch(error => {
  console.error('Error:', error);
});};

function Select_clone_repository(lang:string,path:string){
inquirer.prompt([
  {
    type: 'rawlist',
    name: 'repository',
    message: 'Select a repository:',
    choices: [
      { name: 'CoCo-Community'},
      { name: 'CoCo-Community-Control'},
      { name: 'CoCo-Community-CLI'}
    ],
    default: 0
  }
]).then(answers => {
  const repository = answers.repository;
    Select_cloning_method(lang,repository,path);
}).catch(error => {
  console.error('Error:', error);
})};

function Confirm_clone_repository_path(lang:string, path:string){
    inquirer.prompt([
  {
    type: 'rawlist',
    name: 'Confirm_clone_repository_path',
    message: lang === 'zh' ? '确认克隆路径?' : 'Confirm clone path?',
    choices: [
      { name: lang === 'zh' ? '是' : 'Yes'},
      { name: lang === 'zh' ? '否' : 'No'}
    ],
    default: 0
  }
]).then(answers => {
  console.log('选择了:', answers.Confirm_clone_repository_path);
  if (answers.Confirm_clone_repository_path === '是'){
    Select_clone_repository(lang,path);
  }
  
}).catch(error => {
  console.error('Error:', error);
})
}

function clone(lang:string){
    if (process.argv.length === 3){
        console.log(lang === 'zh' ? "请确认路径为："+process.cwd()+"。" : "Please confirm the path is: "+process.cwd()+".");
        Confirm_clone_repository_path(lang,process.cwd());
    }else {
        console.log(lang === 'zh' ? "请确认路径为："+process.argv[3]+"。" : "Please confirm the path is: "+process.argv[3]+".");
        Confirm_clone_repository_path(lang,process.argv[3]);
    }
}

function printssllang(lang:string,id:string){
    if(lang === 'zh'){
        if (id ==='1'){
            return "请输入项目路径: ";
        } else if (id ==='2'){
            return "正在为项目路径生成SSL证书...路径：";
        } else if(id ==='3'){
            return "生成SSL证书时出错:";
        } else if (id ==='4'){
            return "SSL证书生成成功!";
        }
    }else{
        if (id ==='1'){
            return "Please enter the project path: ";
        } else if (id ==='2'){
            return "Generating SSL certificate.. Path: ";
        } else if(id ==='3'){
            return "Error generating SSL certificate:";
        } else if (id ==='4'){
            return "SSL certificate generated successfully!";
        }
    }
}

function ssl(){
    const url = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    url.question(printssllang(lang,'1')!, (projectPath: string) => {
        console.log(`${printssllang(lang,'2')}${projectPath}`);
        const opensslCommand = `openssl req -x509 -newkey rsa:2048 -keyout coco-community.test-key.pem -out coco-community.test.pem -days 3650 -nodes -subj "/CN=coco-community.test" -addext "subjectAltName=DNS:coco-community.test,DNS:www.coco-community.test,DNS:localhost,IP:127.0.0.1,IP:::1"`;
        
        exec(`cd ${projectPath} && ${opensslCommand}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`${printssllang(lang,'3')}${error.message}`);
                url.close();
                return;
            }
            console.log(printssllang(lang,'4')!);
            url.close();
        });
    });
}

function error_control_input(lang:string){
    return lang === 'zh' ? '缺失控件名 \n 请输入控件名，如下命令：\n cczit control [控件名]' : 'Missing control name \n Please enter the control name using the following command: \ncczit control [control name]';
}

function print_control_information(lang:string, data:any){
    if (lang === 'zh'){
        console.log("控件名："+process.argv[3]);
        console.log("控件作者："+data.author);
        console.log("此控件有："+data.Release_input+"个发行版");
        console.log("最新版本是："+data.Current_version);
    }else{
        console.log("Control Name："+process.argv[3]);
        console.log("Control Author："+data.author);
        console.log("This control has："+data.Release_input+" releases");
        console.log("The latest version is："+data.Current_version);
    }
}

async function fetch_control(lang:string){
    const spinner = fetch_control_loading(lang);
    try{
        const url = `https://cc.zitzhen.cn/control/${process.argv[3]}/information.json`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        //这里先解析文本再尝试解析json，因为服务端容易返回HTTP 200的HTML
        const text = await response.text();
        
        try{
            const data = JSON.parse(text);
            spinner.succeed(lang === 'zh' ? '控件信息获取成功' : 'Control information fetched successfully');
            print_control_information(lang, data);
        }catch(error){
            spinner.fail(lang === 'zh' ? '404 控件不存在' : '404 Control does not exist');
        }

    }catch(error){
        spinner.fail(lang === 'zh' ? '获取控件信息失败' : 'Failed to fetch control information.');
        console.error(error);
    }
}

function fetch_control_loading(lang:string){
    if (lang === 'zh'){
        return ora('正在处理...').start();
    }else{
        return ora('loading...').start();
    }
}

function control(){
    if (process.argv.length > 3){
        fetch_control(lang);
    }else{
        console.error(error_control_input(lang));
    }
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
    }
    else if (args.includes('ssl')) {
        ssl();
    }else if (args.includes('control')){
        control();
    }else if (args.includes('clone')){
        clone(lang);
    }else if (args.includes('search')){
        search();
    }
    else{
        console.log(NotFound(lang));
    }
}else{
    console.log(welcome(lang));
}


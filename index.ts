function welcome() {
    const lang = (process.env.LANG || 'en_US').split('_')[0];
    return lang === 'zh' ? '欢迎使用CoCo-Community CLI!' : '"Welcome to the CoCo Community CLI!';
}

// 使用
console.log(welcome());
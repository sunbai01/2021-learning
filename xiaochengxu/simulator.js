const automater = require('miniprogram-automator');
const path = require('path');

const miniprogram = automater.launch({
    projectPath: path.resolve(__dirname)
})
.then(miniprogram => {
    const page = miniprogram
        .currentPage()
        .then(page => {
            return page
                .waitFor(1000)
                .then(()=> page);
        })
        .then(page => page.$('multiplepic'))
        .then(ele => {
            if(ele && ele.tagName === "multiplepic") {
                console.log('测试通过')
            }
            else {
                console.log('测试未通过')
            }
            console.log('ele', ele);
        })
    console.log('page', page);
});
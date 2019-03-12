
const utils = require('./utils');
const HtmlCompiler = require('./HtmlCompiler').HtmlCompiler;

const appRootDir = () => {
    let dirPathArray = process.cwd().split('/');
    return dirPathArray.join('/');
}

const APP_ROOT_DIR = appRootDir();

async function index() {
    let html = (await utils.readFile(`${APP_ROOT_DIR}/demo/template/cv.html`)).toString();
    let htmlCompiler = new HtmlCompiler(html);
    const htmlResult = (await htmlCompiler.compileTemplate(
        {"var.text1" : "test1"},
        {"var.img1" : `${APP_ROOT_DIR}/demo/assets/tr.png`}));
    await utils.writeFile(`${APP_ROOT_DIR}/output/cv.html`, htmlResult);
}

index();

console.log("===>>> refactoring ....");
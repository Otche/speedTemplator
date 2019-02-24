
const utils = require('./utils');
const HtmlCompiler = require('./HtmlCompiler').HtmlCompiler;
const path = require('path');

const appRootDir = () => {
    let dirPathArray = process.cwd().split('/');
    return dirPathArray.join('/');
}

const APP_ROOT_DIR = appRootDir();

async function index() {
    let html = (await utils.readFile(`${APP_ROOT_DIR}/demo/template/cv.html`)).toString();
    let htmlCompiler = new HtmlCompiler(html);
    console.log(htmlCompiler.findVarsInHtml());
}

index();

console.log("refactoring ....");




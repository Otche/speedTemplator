const msg = require('./const');
const utils = require('./utils');
const htmlCompiler = require('./htmlCompiler');
const path = require('path');

const appRootDir = () => {
    let dirPathArray = process.cwd().split('/');
    dirPathArray.pop();
    return dirPathArray.join('/');
}
const APP_ROOT_DIR = appRootDir();

async function index() {
    let html = utils.readFile(`${APP_ROOT_DIR}/demo/template/cv.html`);
    console.log(appRootDir());
}

index();

console.log("refactoring ....");





const utils = require('./utils');
const HtmlCompiler = require('./HtmlCompiler').HtmlCompiler;

const appRootDir = () => {
    let dirPathArray = process.cwd().split('/');
    return dirPathArray.join('/');
}

const APP_ROOT_DIR = appRootDir();

async function index() {
    let html = (await utils.readFile(`${APP_ROOT_DIR}/demo/template/cv.hbs`)).toString();
    let htmlCompiler = new HtmlCompiler(html);
    const htmlResult = (await htmlCompiler.compileTemplate(
        {"var.text1" : "test1"},
        {"var.img1" : `${APP_ROOT_DIR}/demo/assets/tr.png`,
    "var.style" : `${APP_ROOT_DIR}/demo/template/cv.css`}));
    await utils.writeFile(`${APP_ROOT_DIR}/output/cv.html`, htmlResult);
    if(process.env.GEN_PDF){
        utils.convertHtmlToPdf(htmlResult,`${APP_ROOT_DIR}/output/`, 'cv');
    }
}

index();

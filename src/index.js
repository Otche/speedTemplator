
const utils = require('./utils');
const HtmlCompiler = require('./HtmlCompiler').HtmlCompiler;

const appRootDir = () => {
    let dirPathArray = process.cwd().split('/');
    return dirPathArray.join('/');
}

const APP_ROOT_DIR = appRootDir();

const textTmplt = {"var.text1" : "test1"};
const fileTmplt = {"file.cvImg" : `${APP_ROOT_DIR}/demo/assets/tr.png`,
"file.style" : `${APP_ROOT_DIR}/demo/template/cv.css`,
"file.knowlegeIcon" : `${APP_ROOT_DIR}/demo/assets/knowlege-3d.svg`,
"file.localIcon" : `${APP_ROOT_DIR}/demo/assets/map-localization.svg`,
"file.workIcon" : `${APP_ROOT_DIR}/demo/assets/portfolio.svg`,
"file.phoneIcon" : `${APP_ROOT_DIR}/demo/assets/mobile-phone.svg`,
"file.emailIcon" : `${APP_ROOT_DIR}/demo/assets/at.svg`,
"file.upArraw" : `${APP_ROOT_DIR}/demo/assets/long-arrow-pointing-up.svg`,
"file.edifixio" : `${APP_ROOT_DIR}/demo/assets/edifixio.svg`,
"file.graduation" : `${APP_ROOT_DIR}/demo/assets/college-graduation.svg`,
"file.database" : `${APP_ROOT_DIR}/demo/assets/database.svg`,
"file.mobile" : `${APP_ROOT_DIR}/demo/assets/mobile.svg`,
"file.crm" : `${APP_ROOT_DIR}/demo/assets/crm.svg`,
"file.screwdriver" : `${APP_ROOT_DIR}/demo/assets/screwdriver-and-wrench-crossed.svg`,
"file.terminal" : `${APP_ROOT_DIR}/demo/assets/terminal.svg`,
"file.dataanalytics" : `${APP_ROOT_DIR}/demo/assets/data-analytics-wheel-graphic.svg`,
"file.english" : `${APP_ROOT_DIR}/demo/assets/english-language.svg`
};
//



async function index() {
    let html = (await utils.readFile(`${APP_ROOT_DIR}/demo/template/cv.hbs`)).toString();
    let htmlCompiler = new HtmlCompiler(html);
    const htmlResult = (await htmlCompiler.compileTemplate(textTmplt,fileTmplt));
    await utils.writeFile(`${APP_ROOT_DIR}/output/cv.html`, htmlResult);
    if(process.env.GEN_PDF){
        utils.convertHtmlToPdf(htmlResult,`${APP_ROOT_DIR}/output/`, 'cv');
    }
}

index();

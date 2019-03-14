const fs = require('fs');
const puppeteer = require('puppeteer');

exports.readFile = (async (_path, isabsolute) => {
    return new Promise((resolve, reject) => {
        fs.readFile(_path, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
});



exports.writeFile = (async (_path, content) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(_path, content, (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
});


/**
 * @author Amine OUCHIHA
 * @param {*} html 
 * @description convert html input to pdf using puppeteer
 */
exports.convertHtmlToPdf = async (html, _path, name, format) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html);
        page.emulateMedia('screen');
        await page.pdf({
            path: _path+name+'.pdf',
            format: (format)? format : 'A4',
            printBackground: true
        });
        await browser.close();
        process.exit();
    } catch (e) {
        console.log('our error', e);
    }
}




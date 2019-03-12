const fs = require('fs');

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
exports.convert = async (html, _path, name, format) => {
    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage();
        await page.setContent(html);
        page.emulateMedia('screen');
        await page.pdf({
            path: PDF_NAME,
            format: PDF_FORMAT,
            printBackground: true
        });
        await browser.close();
        console.log('done');
        process.exit();

    } catch (e) {
        console.log('our error', e);
    }
}




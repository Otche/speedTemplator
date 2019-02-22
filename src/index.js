const fs = require("fs");
const path = require('path');



async function readFile(_path, isabsolute ){
    const currentDir = process.cwd();
    const filePath = path.join(((!isabsolute)?currentDir : '') +_path);
    return new Promise(function(resolve, reject){
        fs.readFile(filePath,function (err, data) {
            if (err) {
               reject(err);
            }
            resolve(data);
        });
    });
}


async function main(){
    try{
        console.log( (await readFile('/templator/cv.html')).toString() );
    }catch(e){
        console.error(e);
    }

}

main();

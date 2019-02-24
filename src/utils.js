const fs = require('fs');

exports.readFile = (async function readFile(_path, isabsolute) {
    return new Promise(function (resolve, reject) {
        fs.readFile(_path, function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
});
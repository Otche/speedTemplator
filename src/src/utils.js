export async function readFile(_path, isabsolute) {
    const filePath = path.join(((!isabsolute) ? CURRENT_DIR : '') + _path);
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}
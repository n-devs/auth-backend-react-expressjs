const RFSQL = require('../resertFileSQL/index');
const fs = require('fs');
const mysql = require('mysql');
const readline = require('readline');


async function createTable(_config, _path) {
    return await new Promise((resolve, reject) => {
        const _mysql = mysql.createConnection(_config);
        console.log(_config);

        _mysql.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            RFSQL(_path).then(files => {
                files.map(file => {
                    const _file = fs.readFileSync(_path + '/' + file, 'utf8')
                    // const rl = readline.createInterface({
                    //     input: fs.readFile(_path + '/' + file, 'utf8'),
                    //     terminal: false
                    // });


                    console.log();
                    var _sql = JSON.stringify(_file).replace(/\\n/g, '');
                    _sql = _sql.replace('"', '')

                    _sql = _sql.replace(';"', ';')

                    _mysql.query(_sql, function (err, results) {
                        if (err) {
                            reject({
                                success: false,
                                message: err
                            });
                        } else {
                            // console.log(`create table ${chunk.toString('ascii')}`,results);
                            resolve({
                                success: true,
                                message: "success create table", results
                            })
                        }
                    });


                    _mysql.end();
                })
            })
            console.log('connected as id ' + _mysql.threadId);
        });


    })

}

module.exports = createTable
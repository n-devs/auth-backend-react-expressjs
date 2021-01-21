const fs = require('fs');

async function resertFileSQL(filename) {

    return await new Promise((resolve, reject) => {
        let _type_file = '';
        let _name_file = '';
        const _file_all = [];
    
        fs.readdir(filename, (err, files) => {
            files.forEach(file => {
                _type_file = file.slice(file.length - 4, file.length);
                _name_file = file.slice(0, -4);
                // console.log(file, _type_file.startsWith('.sql'), _name_file);
    
                if (_type_file.startsWith('.sql')) {
                    _file_all.push(`${_name_file}${_type_file}`)
                    resolve(_file_all)
                }
    
            });
        });

        
    })
 
};
const RFSQL = module.exports = exports = resertFileSQL;
const env = require('dotenv-mode')
const createDatabase = require('./lib/createDatabase/index')
const createTable = require('./lib/createTable/index')

var config = {
    host: `${env("DB_HOST")}`,
    user: `${env("DB_USER")}`,
    password: `${env("DB_PASSWORD")}`
}

const _list_db_name = ["Authentication"];

const path_db = `${__dirname}/mysql/create_db`;


const path_table = `${__dirname}/mysql/create_table`;
createDatabase(config, path_db).then(_s => {
    if (_s.success) {
        console.log(_s.message);
        _list_db_name.map(_name => {
            createTable({ ...config, ['database']: `${_name}` }, `${path_table}/${_name}`).then(__s => {
                console.log(__s.message);
            }).catch(__e => {
                console.log(__e.message);
            })
        })
    }

}).catch(_e => {
    console.log(_e.message);
})


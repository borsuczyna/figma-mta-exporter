const express = require('express');
const app = express();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'sql.22.svpj.link',
    user: 'db_94727',
    database: 'db_94727',
    password: 'NnvUrDkFtZxC'
});

app.set('view engine', 'ejs');
app.set('views', __dirname);

function refreshAndDeleteExpired() {
    connection.promise().query(`DELETE FROM export WHERE \`expire-date\` < NOW()`).then(() => {
        console.log('Deleted expired');
    });
}

app.get('/', async (req, res) => {
    refreshAndDeleteExpired();

    const [rows, fields] = await connection.promise().query(`SELECT * FROM export WHERE ip = '${req.ip}'`);
    let data = [];
    for (let i = 0; i < rows.length; i++) {
        data.push({
            id: rows[i].id,
            data: rows[i].data,
            uploadDate: rows[i]['upload-time'],
            expireDate: rows[i]['expire-date']
        });
    }

    res.render('index', {
        data: data,
    });
});

app.get('/download/:id', async (req, res) => {
    refreshAndDeleteExpired();

    const [rows, fields] = await connection.promise().query(`SELECT * FROM export WHERE id = '${req.params.id}'`);
    if (rows.length == 0) {
        res.status(404).send('Not found');
        return;
    }

    if(rows[0].ip != req.ip) {
        res.status(403).send('Forbidden');
        return;
    }

    // send as json
    res.setHeader('Content-Type', 'application/json');
    res.send(rows[0].data);
    console.log(`Downloaded ${rows[0]} (${rows[0].id})`);
});

app.get('/delete/:id', async (req, res) => {
    refreshAndDeleteExpired();

    await connection.promise().query(`DELETE FROM export WHERE id = '${req.params.id}' AND ip = '${req.ip}'`);
    console.log(`Deleted ${req.params.id}`);
    res.redirect('/');
});

app.post('/export', express.urlencoded({ extended: true }), async (req, res) => {
    refreshAndDeleteExpired();

    let data = JSON.parse(req.body);
    if(!data.files || !Array.isArray(data.files) || data.files.length != 3) {
        res.status(400).send('Bad request');
        return;
    }

    // json looks like this: { files: [ { name: 'file1', code: 'code1' }, { name: 'file2', code: 'code2' }, { name: 'file3', code: 'code3' } ] }
    let files = [];
    for(let file of data.files) {
        // if file is too big, reject
        if(file.code.length > 100000) {
            res.status(413).send('Payload too large');
            return;
        }

        files.push({
            name: file.name,
            code: file.code.replaceAll('\\n', '<!newline!>')
        });
    }

    // insert into database but awoid sql injection
    await connection.promise().query(`INSERT INTO export (\`ip\`, \`data\`, \`upload-time\`, \`expire-date\`) VALUES ('${req.ip}', '${JSON.stringify({ files: files })}', NOW(), NOW() + INTERVAL 5 MINUTE)`);
});

app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/style.css');
});

app.get('/script.js', (req, res) => {
    res.sendFile(__dirname + '/script.js');
});

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});
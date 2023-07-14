const ws = require('ws');
const wss = new ws.Server({ port: 8080 });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log('received: %s', message);
    });
    ws.send('something');
});
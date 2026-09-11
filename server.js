const express = require('express');
const Unblocker = require('unblocker');
const app = express();
const PORT = process.env.PORT || 3000;

const unblocker = new Unblocker({ prefix: '/proxy/' });

app.use(unblocker);

app.get('/', (req, res) => {
    res.send(`
        <h1>Proxy Server Active</h1>
        <p>To use the proxy, format your URL like this:</p>
        <code>http://localhost:${PORT}/proxy/https://google.com</code>
    `);
});

const server = app.listen(PORT, () => {
    console.log(`Proxy server is running at http://localhost:${PORT}`);
});

server.on('upgrade', unblocker.onUpgrade);

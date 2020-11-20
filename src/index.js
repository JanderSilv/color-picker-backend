const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');

const app = express();
const server = http.Server(app);

const routes = require('./routes.js');
const { setupWebsocket } = require('./socket.js');

setupWebsocket(server);

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
server.listen(3333);

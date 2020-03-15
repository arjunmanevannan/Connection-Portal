const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

const routes = require('./routers.js')
app.use('/', routes);

app.listen(3000);

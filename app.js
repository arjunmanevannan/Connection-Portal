const express = require('express');
const helmet = require('helmet');
const app = express();

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(helmet());

const routes = require('./routers.js')
const connectionRoutes = require('./connectionRouters.js')
app.use('/', routes);
app.use('/connection', connectionRoutes);

app.listen(3000);

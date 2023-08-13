const express = require('express');
const bodyParser = require('body-parser');
//const {config} = require('./src/config');
const debug = require('debug')('app: main');
const {UnitAPI} = require('./src/apis/unit');
const {QuestionAPI} = require('./src/apis/question');
const {UserAPI} = require('./src/apis/users');
const cors = require('cors');
process.env.DEBUG = 'app:main';
const PORT = 3000;

const app = express();
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

UnitAPI(app);
QuestionAPI(app);
UserAPI(app);

app.listen(PORT, ()=> {debug(`servidos  escuchando en el puerto ${PORT }`)});    
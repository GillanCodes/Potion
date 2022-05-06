import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import * as express from 'express';
import config from "./config/config";

let app: express.Application = express();

require('./config/database');

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(bodyParser.json({ limit: "50mb" }))
app.use(cookieParser());

import authRoutes from './src/routes/auth.routes';
import userRoutes from './src/routes/user.routes';
import noteRoutes from './src/routes/note.routes';

let cors = require('cors');
const corsOptions = {
    origin: "http://localhost:3000",
    'credentials': true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
    optionsSuccessStatus: 200,
  }
app.use(cors(corsOptions));

let { checkUser } = require('./middlewares/auth.middleware');
app.use(checkUser)


app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/note', noteRoutes);


app.listen(process.env.PORT, () => {
    console.log('[Potion] Api Started : Listening on ' + config.PORT);
});
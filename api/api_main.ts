import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import * as express from 'express';
import config from "./config/config";
import * as cors from 'cors';

let app: express.Application = express();

require('./config/database');

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(bodyParser.json({ limit: "50mb" }))
app.use(cookieParser());

import authRoutes from './src/routes/auth.routes';
import userRoutes from './src/routes/user.routes';
import noteRoutes from './src/routes/note.routes';

app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/note', noteRoutes);


app.listen(process.env.PORT, () => {
    console.log('[Potion] Api Started : Listening on ' + config.PORT);
});
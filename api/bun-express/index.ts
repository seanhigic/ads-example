import "reflect-metadata"
import express, { type Request, type Response, type NextFunction, type Express } from 'express';
import path from 'path'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import figlet from 'figlet'

import aboutService from './src/services/aboutService'
import adService from './src/services/adService'

import morganConfig from './src/morganConfig'
import logger from './src/logger'
import userService from "./src/services/userService";
import productService from "./src/services/productService";
import configService from "./src/services/configService";

const app: Express = express();
const port = process.env.PORT || 4200;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: 'my-secret',
    resave: false,
    cookie: { secure: false },
    saveUninitialized: true
}));

app.use('/api/about', aboutService);
app.use('/api/config', configService);
app.use('/api/ads', adService);
app.use('/api/users', userService);
app.use('/api/products', productService);

app.use('/data', express.static(path.join(__dirname, 'data')));

let bannerText = await figlet.text("ACME Foods", {
    font: "Standard",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 100,
    whitespaceBreak: true,
  })
console.log(bannerText);

if (process.env.ENV?.toLowerCase() == "production") {
    if(process.env.HTTP_LOGGING) {
        // use pino structured http request logging in production
        const pinoHttp = require('pino-http')()
        app.use(pinoHttp);
    }
    app.use(express.static(path.join(__dirname, '../../ui/.dist')));

    // protect SPA routes to prevent Express from throwing a 404 on a browser refresh
    // app.use('/site/home', express.static(path.join(__dirname, 'public')));

    logger.info("Hosting SPA at public root");
} else {
    // use morgan http logging in dev for pretty print easy to read
    // until we can sort out the recipe for pino
    app.use(morganConfig);
}
  
app.listen(port, () => {
    logger.warn(`Server is running at http://localhost:${port}`);
});

app.use((err: any, req: Request, res: Response, next: Function) => {

    let msg: string = `ExpressJS Server Error: ${err.message}`;
    let httpCode: number = 500;

    if (err.name == "AuthError") {
        httpCode = 401;
    } else {
        logger.error(msg, err);
        console.error(err);
    }
    logger.warn(`returning a ${httpCode}`);
    res.status(httpCode).send(msg);
});


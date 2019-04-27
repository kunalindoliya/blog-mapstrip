/*import express=require("express");

const app: express.Application = express();
// view engine setup
app.set("views", "views");
app.set("view engine", "ejs");

//server
app.listen(3000);*/

// run server with yarn dev or npm run dev

import express from 'express'
import * as bodyParser from 'body-parser'
import {MasterRouter} from "./lib/routes/MasterRouter";
import path from 'path';
import multer from 'multer';

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + file.originalname);
    }
});
const filter = (req,file,cb)=>{
    if(file.mimetype==='image/png'||file.mimetype==='image/jpg'||file.mimetype==='image/jpeg')
        cb(null,true);
    else
        cb(null,false);
};

class App {
    public app: express.Application;
    public mainRouter: MasterRouter = new MasterRouter();

    constructor() {
        this.app = express();
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use('/files',express.static(path.join(__dirname, 'files')));
        this.app.use(bodyParser.json());
        this.app.use(multer({storage:fileStorage,fileFilter:filter}).single('image'));
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.set("views", "lib/views");
        this.app.set("view engine", "ejs");
        this.mainRouter.routes(this.app);
    }
}

export default new App().app

import express from 'express'
import * as bodyParser from 'body-parser'
import {MasterRouter} from "./lib/routes/MasterRouter";
import path from 'path';
import multer from 'multer';
import moment from "moment";
import sequelize from './lib/util/database';
import {User} from "./lib//models/user.model";
import session from "express-session";
import store from 'connect-session-sequelize';
import flash from 'connect-flash';

const SequelizeStore=store(session.Store);
const sessionStore= new SequelizeStore({
   db:sequelize
});

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'build/files');
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
        this.app.use('/build/files',express.static(path.join(__dirname, 'files')));
        this.app.use(bodyParser.json());
        this.app.use(multer({storage:fileStorage,fileFilter:filter}).single('image'));
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(session({
            secret: "my secret",
            store: sessionStore,
            resave: false,
            saveUninitialized: false
        }));
        this.app.use(flash());
        this.app.use((req:any,res:any,next:any)=>{
            if(!req.session.user){
                return next();
            }
            User.findByPk(req.session.user.id)
                .then(user => {
                    req.user = user;
                    next();
                })
                .catch(err => console.log(err));
        });
        this.app.set("views", "lib/views");
        this.app.set("view engine", "ejs");
        this.app.locals.moment=moment;
        this.mainRouter.routes(this.app);
    }
}

export default new App().app

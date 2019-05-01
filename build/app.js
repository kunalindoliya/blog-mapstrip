"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const MasterRouter_1 = require("./lib/routes/MasterRouter");
const multer_1 = __importDefault(require("multer"));
const moment_1 = __importDefault(require("moment"));
const database_1 = __importDefault(require("./lib/util/database"));
const user_model_1 = require("./lib/models/user.model");
const express_session_1 = __importDefault(require("express-session"));
const connect_session_sequelize_1 = __importDefault(require("connect-session-sequelize"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const SequelizeStore = connect_session_sequelize_1.default(express_session_1.default.Store);
const sessionStore = new SequelizeStore({
    db: database_1.default
});
const fileStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + file.originalname);
    }
});
const filter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg')
        cb(null, true);
    else
        cb(null, false);
};
class App {
    constructor() {
        this.mainRouter = new MasterRouter_1.MasterRouter();
        this.app = express_1.default();
        this.app.use(express_1.default.static('public'));
        this.app.use('/files', express_1.default.static('files'));
        this.app.use(bodyParser.json());
        this.app.use(multer_1.default({ storage: fileStorage, fileFilter: filter }).single('image'));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express_session_1.default({
            secret: "my secret",
            store: sessionStore,
            resave: false,
            saveUninitialized: false
        }));
        this.app.use(connect_flash_1.default());
        this.app.use((req, res, next) => {
            if (!req.session.user) {
                return next();
            }
            user_model_1.User.findByPk(req.session.user.id)
                .then(user => {
                req.user = user;
                next();
            })
                .catch(err => console.log(err));
        });
        this.app.set("views", "lib/views");
        this.app.set("view engine", "ejs");
        this.app.locals.moment = moment_1.default;
        this.mainRouter.routes(this.app);
    }
}
exports.default = new App().app;

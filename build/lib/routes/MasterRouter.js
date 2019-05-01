"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const view_controller_1 = __importDefault(require("../controller/view.controller"));
const admin_controller_1 = __importDefault(require("../controller/admin.controller"));
const auth_1 = __importDefault(require("../util/auth"));
class MasterRouter {
    constructor() {
        this.userController = new user_controller_1.default();
        this.viewController = new view_controller_1.default();
        this.adminController = new admin_controller_1.default();
    }
    routes(app) {
        app.route('/user')
            .get(this.userController.SomeGET);
        app.route('/').get(this.viewController.getIndex);
        app.route('/blog').get(this.viewController.getBlog);
        app.route('/blog/:stub').get(this.viewController.getBlogDetail);
        app.route('/admin').get(this.adminController.getIndex);
        app.route('/admin').post(this.adminController.postIndex);
        app.route('/admin/dashboard').get(auth_1.default, this.adminController.getDashboard);
        app.route('/admin/add-blog').get(auth_1.default, this.adminController.getAddBlog);
        app.route('/admin/add-blog').post(auth_1.default, this.adminController.postAddBlog);
        app.route('/admin/add-file').get(auth_1.default, this.adminController.getAddFile);
        app.route('/admin/add-file').post(auth_1.default, this.adminController.postAddFile);
        app.route('/admin/add-user').get(auth_1.default, this.adminController.getAddUser);
        app.route('/admin/add-user').post(auth_1.default, this.adminController.postAddUser);
        app.route('/admin/logout').post(auth_1.default, this.adminController.postLogout);
    }
}
exports.MasterRouter = MasterRouter;

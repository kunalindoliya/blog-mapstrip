import {Application} from "express";
import UserController from "../controller/user.controller";
import ViewController from "../controller/view.controller";
import AdminController from "../controller/admin.controller";
import isAuth from "../util/auth";

export class MasterRouter {

    public userController: UserController = new UserController();
    public viewController: ViewController = new ViewController();
    public adminController: AdminController = new AdminController();

    public routes(app: Application): void {
        app.route('/user')
            .get(this.userController.SomeGET);
        app.route('/').get(this.viewController.getIndex);
        app.route('/blog').get(this.viewController.getBlog);
        app.route('/blog/:stub').get(this.viewController.getBlogDetail);
        app.route('/admin').get(this.adminController.getIndex);
        app.route('/admin').post(this.adminController.postIndex);
        app.route('/admin/dashboard').get(isAuth,this.adminController.getDashboard);
        app.route('/admin/add-blog').get(isAuth,this.adminController.getAddBlog);
        app.route('/admin/add-blog').post(isAuth,this.adminController.postAddBlog);
        app.route('/admin/add-file').get(isAuth,this.adminController.getAddFile);
        app.route('/admin/add-file').post(isAuth,this.adminController.postAddFile);
        app.route('/admin/add-user').get(isAuth,this.adminController.getAddUser);
        app.route('/admin/add-user').post(isAuth,this.adminController.postAddUser);
        app.route('/admin/logout').post(isAuth,this.adminController.postLogout);
    }
}

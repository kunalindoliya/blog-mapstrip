import {Application} from "express";
import UserController from "../controller/user.controller";
import ViewController from "../controller/view.controller";
import AdminController from "../controller/admin.controller";

export class MasterRouter {

    public userController: UserController = new UserController();
    public viewController: ViewController = new ViewController();
    public adminController: AdminController = new AdminController();

    public routes(app: Application): void {
        app.route('/user')
            .get(this.userController.SomeGET);
        app.route('/').get(this.viewController.getIndex);
        app.route('/blog').get(this.viewController.getBlog);
        app.route('/admin').get(this.adminController.getIndex);
        app.route('/admin').post(this.adminController.postIndex);
        app.route('/admin/dashboard').get(this.adminController.getDashboard);
        app.route('/admin/add-blog').get(this.adminController.getAddBlog);
    }
}

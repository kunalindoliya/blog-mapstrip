import {Application} from "express";
import UserController from "../controller/user.controller";
import ViewController from "../controller/view.controller";

export class MasterRouter {

    public userController: UserController = new UserController();
    public viewController: ViewController = new ViewController();

    public routes(app: Application): void {
        app.route('/user')
            .get(this.userController.SomeGET);
        app.route('/').get(this.viewController.getIndex);
        app.route('/blog').get(this.viewController.getBlog);
    }
}

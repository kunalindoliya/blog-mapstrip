import {Application} from "express";
import UserController from "../controller/user.controller";

export class MasterRouter {

    public userController: UserController = new UserController()

    public routes(app: Application): void {
        app.route('/user')
            .get(this.userController.SomeGET)
    }
}

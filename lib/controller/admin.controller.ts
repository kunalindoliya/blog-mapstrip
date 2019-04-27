import {Request, Response} from "express";
import {User} from "../models/user.model";


export default class AdminController {
    public getIndex(req: Request, res: Response) {
        res.render('admin/index', {title: 'MapStrip Admin'});
    }

    public postIndex(req: Request, res: Response) {
        const email = req.body.email;
        const password = req.body.password;
        User.findOne({where: {email: email, password: password}}).
        then(user=>{
            if(!user){
               return res.redirect('/admin');
            }
            res.redirect('/admin/dashboard');
        }).catch(err => console.log(err));
    }

    public getDashboard(req: Request, res: Response){
        res.render('admin/dashboard',{title:'Dashboard'});
    }

    public getAddBlog(req: Request, res: Response){
        res.render('admin/add-blog',{title:'Add Blog'});
    }
}
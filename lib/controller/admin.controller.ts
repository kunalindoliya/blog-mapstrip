import {Request, Response} from "express";
import {User} from "../models/user.model";
import {File} from "../models/file.model";
import Puid = require("puid");

const puid=new Puid(true);

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
        File.findAll().then(files=>{
            res.render('admin/add-blog',{title:'Add Blog',files:files});
        }).catch(err=>console.log(err));
    }
    public postAddBlog(req: Request, res: Response){
        console.log(req.body);
    }
    public getAddFile(req: Request, res: Response){
        res.render('admin/add-file',{title:'Add File'});
    }
    public postAddFile(req: Request, res: Response){
        File.create({
            id:puid.generate(),
            url:req.file.path
        }).then(result=>{
            res.redirect('/admin/add-file');
        }).catch(err=>console.log(err));
    }
}
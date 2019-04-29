import {Request, Response} from "express";
import {User} from "../models/user.model";
import {File} from "../models/file.model";
import {Blog} from "../models/blog.model";
import Puid = require("puid");

const puid=new Puid(true);

export default class AdminController {
    public getIndex(req: Request, res: Response) {
        res.render('admin/index', {title: 'MapStrip Admin'});
    }

    public postIndex(req: any, res: Response) {
        const email = req.body.email;
        const password = req.body.password;
        User.findOne({where: {email: email, password: password}}).
        then(user=>{
            if(!user){
               return res.redirect('/admin');
            }
            req.session.user = user;
            return req.session.save(err => {
                if (err) {
                    console.log(err);
                }
                res.redirect("/admin/dashboard");
            });
        }).catch(err => console.log(err));
    }

    public getDashboard(req: any, res: Response){
        res.render('admin/dashboard',{title:'Dashboard',user:req.user});
    }

    public getAddBlog(req: any, res: Response){
        File.findAll().then(files=>{
            res.render('admin/add-blog',{title:'Add Blog',user:req.user,files:files});
        }).catch(err=>console.log(err));
    }
    public postAddBlog(req: Request, res: Response){
        console.log(req.body);
        Blog.create({
            id:puid.generate(),
            title:req.body.title,
            category:req.body.category,
            stub:req.body.stub,
            status:req.body.status,
            coverImage:req.body.coverImage,
            thumbnailImage:req.body.thumbnailImage,
            externalResource:req.body.extRes,
            externalResourceType:req.body.extResType,
            tags:req.body.tags,
            shortDescription:req.body.shortDescription,
            data:req.body.data
        }).then(result=>{
            res.redirect('/admin/add-blog');
        }).catch(err=>console.log(err));
    }
    public getAddFile(req: any, res: Response){
        File.findAll().then(files=>{
            res.render('admin/add-file',{title:'Add File',user:req.user,files:files});
        }).catch(err=>console.log(err));

    }
    public postAddFile(req: Request, res: Response){
        File.create({
            id:puid.generate(),
            url:req.file.path
        }).then(result=>{
            res.redirect('/admin/add-file');
        }).catch(err=>console.log(err));
    }
    public getAddUser(req:any,res:Response){
        res.render('admin/add-user',{title:'Add User',user:req.user});
    }
    public postAddUser(req:Request,res:Response){
        const firstName=req.body.firstName;
        const lastName=req.body.lastName;
        const email=req.body.email;
        const password=req.body.password;
        let avatar;
        if(!req.file){
            avatar='build/files/dummy-profile.jpg'
        }else {
            avatar=req.file.path;
        }
        User.create({
            id:puid.generate(),
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password,
            avatar:avatar
        }).then(result=>{
            res.redirect('/admin/add-user');
        }).catch(err=>console.log(err));
    }

    public postLogout(req:any,res:Response){
        req.session.destroy(err=>{
            res.redirect('/admin');
        })
    }

}
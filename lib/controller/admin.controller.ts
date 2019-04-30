import {Request, Response} from "express";
import {User} from "../models/user.model";
import {File} from "../models/file.model";
import {Blog} from "../models/blog.model";
import {Category} from "../models/category.model";
import {Tag} from "../models/tag.model";
import {BlogTag} from "../models/blog-tag.model";
import Puid = require("puid");

const puid = new Puid(true);

export default class AdminController {
    public getIndex(req: Request, res: Response) {
        res.render('admin/index', {title: 'MapStrip Admin'});
    }

    public postIndex(req: any, res: Response) {
        const email = req.body.email;
        const password = req.body.password;
        User.findOne({where: {email: email, password: password}}).then(user => {
            if (!user) {
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

    public getDashboard(req: any, res: Response) {
        res.render('admin/dashboard', {title: 'Dashboard', user: req.user});
    }

    public getAddBlog(req: any, res: Response) {
        let message = req.flash("info");
        if (message.length > 0) {
            message = message[0];
        } else {
            message = null;
        }
        File.findAll().then(files => {
            res.render('admin/add-blog', {title: 'Add Blog', user: req.user, files: files, message: message});
        }).catch(err => console.log(err));
    }

    public postAddBlog(req: any, res: Response) {
        const formCategory = req.body.category;
        Category.findOne({where: {title: formCategory}})
            .then(category => {
                if (!category) {
                    category=Category.create({title: formCategory})
                }
                return Blog.create({
                    title: req.body.title,
                    category_name: req.body.category,
                    stub: req.body.stub.split(' ').join('-'),
                    status: req.body.status,
                    coverImage: req.body.coverImage,
                    thumbnailImage: req.body.thumbnailImage,
                    externalResource: req.body.extRes,
                    externalResourceType: req.body.extResType,
                    tags_name: req.body.tags,
                    shortDescription: req.body.shortDescription,
                    data: req.body.data,
                    userId: req.user.id,
                    categoryId: category.id
                }).then(result => {
                    let tags = req.body.tags.split(' ');
                    console.log(tags);
                    for (let i = 0; i < tags.length; i++) {
                        console.log("in loop");
                        Tag.findOne({where: {title: tags[i]}})
                            .then(tag => {
                            if (!tag) {
                                tag=Tag.create({title: tags[i]});
                            }
                            BlogTag.create({blogId: result.id, tagId: tag.id});
                        }).catch(err => console.log(err));
                    }
                }).then(result => {
                    req.flash("info", "Blog Added Successfully.");
                    return req.session.save(err => {
                        res.redirect('/admin/add-blog');
                    });
                })
            }).catch(err => console.log(err));
    }

    public getAddFile(req: any, res: Response) {
        let message = req.flash("info");
        if (message.length > 0) {
            message = message[0];
        } else {
            message = null;
        }
        File.findAll().then(files => {
            res.render('admin/add-file', {title: 'Add File', user: req.user, files: files, message: message});
        }).catch(err => console.log(err));

    }

    public postAddFile(req: any, res: Response) {
        File.create({
            url: req.file.path
        }).then(result => {
            req.flash('info', "File Added Successfully.");
            return req.session.save(err => {
                res.redirect('/admin/add-file');
            });
        }).catch(err => console.log(err));
    }

    public getAddUser(req: any, res: Response) {
        let message = req.flash("info");
        if (message.length > 0) {
            message = message[0];
        } else {
            message = null;
        }
        res.render('admin/add-user', {title: 'Add User', user: req.user, message: message});
    }

    public postAddUser(req: any, res: Response) {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const password = req.body.password;
        let avatar;
        if (!req.file) {
            avatar = 'build/files/dummy-profile.jpg'
        } else {
            avatar = req.file.path;
        }
        User.create({
            id: puid.generate(),
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            avatar: avatar
        }).then(result => {
            req.flash('info', 'User Added Successfully.');
            return req.session.save(err => {
                res.redirect('/admin/add-user');
            });
        }).catch(err => console.log(err));
    }

    public postLogout(req: any, res: Response) {
        req.session.destroy(err => {
            res.redirect('/admin');
        });
    }
}
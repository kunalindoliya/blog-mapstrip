"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
const file_model_1 = require("../models/file.model");
const blog_model_1 = require("../models/blog.model");
const category_model_1 = require("../models/category.model");
const tag_model_1 = require("../models/tag.model");
const blog_tag_model_1 = require("../models/blog-tag.model");
const Puid = require("puid");
const puid = new Puid(true);
class AdminController {
    getIndex(req, res) {
        res.render('admin/index', { title: 'MapStrip Admin' });
    }
    postIndex(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        user_model_1.User.findOne({ where: { email: email, password: password } }).then(user => {
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
    getDashboard(req, res) {
        res.render('admin/dashboard', { title: 'Dashboard', user: req.user });
    }
    getAddBlog(req, res) {
        let message = req.flash("info");
        if (message.length > 0) {
            message = message[0];
        }
        else {
            message = null;
        }
        file_model_1.File.findAll().then(files => {
            res.render('admin/add-blog', { title: 'Add Blog', user: req.user, files: files, message: message });
        }).catch(err => console.log(err));
    }
    postAddBlog(req, res) {
        const formCategory = req.body.category;
        const tags = req.body.tags.split(' ');
        blog_model_1.Blog.create({
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
        }).then(blog => {
            category_model_1.Category.findOne({ where: { title: formCategory } })
                .then(category => {
                if (!category) {
                    category_model_1.Category.create({ title: formCategory }).then(category => {
                        blog.categoryId = category.id;
                        return blog.save();
                    });
                }
                blog.categoryId = category.id;
                return blog.save();
            }).then(blog => {
                for (let t of tags) {
                    tag_model_1.Tag.findOne({ where: { title: t } }).then(tag => {
                        if (!tag) {
                            return tag_model_1.Tag.create({ title: t }).then(tag => {
                                blog_tag_model_1.BlogTag.create({ blogId: blog.id, tagId: tag.id });
                            });
                        }
                        return blog_tag_model_1.BlogTag.create({ blogId: blog.id, tagId: tag.id });
                    });
                }
            });
        }).then(result => {
            req.flash("info", "Blog Added Successfully.");
            return req.session.save(err => {
                res.redirect('/admin/add-blog');
            });
        }).catch(err => console.log(err));
    }
    getAddFile(req, res) {
        let message = req.flash("info");
        if (message.length > 0) {
            message = message[0];
        }
        else {
            message = null;
        }
        file_model_1.File.findAll().then(files => {
            res.render('admin/add-file', { title: 'Add File', user: req.user, files: files, message: message });
        }).catch(err => console.log(err));
    }
    postAddFile(req, res) {
        file_model_1.File.create({
            url: req.file.path
        }).then(result => {
            req.flash('info', "File Added Successfully.");
            return req.session.save(err => {
                res.redirect('/admin/add-file');
            });
        }).catch(err => console.log(err));
    }
    getAddUser(req, res) {
        let message = req.flash("info");
        if (message.length > 0) {
            message = message[0];
        }
        else {
            message = null;
        }
        res.render('admin/add-user', { title: 'Add User', user: req.user, message: message });
    }
    postAddUser(req, res) {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const password = req.body.password;
        let avatar;
        if (!req.file) {
            avatar = 'build/files/dummy-profile.jpg';
        }
        else {
            avatar = req.file.path;
        }
        user_model_1.User.create({
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
    postLogout(req, res) {
        req.session.destroy(err => {
            res.redirect('/admin');
        });
    }
}
exports.default = AdminController;

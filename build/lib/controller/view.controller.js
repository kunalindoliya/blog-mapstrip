"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blog_model_1 = require("../models/blog.model");
class ViewController {
    getIndex(req, res) {
        res.render('index', { title: 'Mapstrip Online' });
    }
    getBlog(req, res) {
        blog_model_1.Blog.findAll().then(blogs => {
            res.render('blog', { title: 'Blog', blogs: blogs });
        }).catch(err => console.log(err));
    }
    getBlogDetail(req, res) {
        const stub = req.params.stub;
        blog_model_1.Blog.findOne({ where: { stub: stub } }).then(blog => {
            console.log(blog);
            console.log(blog.data);
            res.render('blog-detail', { title: blog.title, blog: blog });
        }).catch(err => console.log(err));
    }
}
exports.default = ViewController;

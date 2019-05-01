"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("../models/user.model");
const blog_model_1 = require("../models/blog.model");
const file_model_1 = require("../models/file.model");
const category_model_1 = require("../models/category.model");
const tag_model_1 = require("../models/tag.model");
const blog_tag_model_1 = require("../models/blog-tag.model");
const sequelize = new sequelize_typescript_1.Sequelize({
    database: 'blog-mapstrip',
    dialect: 'mysql',
    username: 'root',
    password: '',
    storage: ':memory:'
});
sequelize.addModels([user_model_1.User, blog_model_1.Blog, file_model_1.File, category_model_1.Category, tag_model_1.Tag, blog_tag_model_1.BlogTag]);
exports.default = sequelize;

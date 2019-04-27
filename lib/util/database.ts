import {Sequelize} from 'sequelize-typescript';
import {User} from "../models/user.model";
import {Blog} from "../models/blog.model";
import {File} from "../models/file.model";


const sequelize =  new Sequelize({
    database: 'blog-mapstrip',
    dialect: 'mysql',
    username: 'root',
    password: '',
    storage: ':memory:'
});
sequelize.addModels([User,Blog,File]);
export  default sequelize;

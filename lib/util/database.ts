import {Sequelize} from 'sequelize-typescript';
import {User} from "../models/user.model";
import {Blog} from "../models/blog.model";
import {File} from "../models/file.model";
import {Category} from '../models/category.model';
import {Tag} from '../models/tag.model';
import {BlogTag} from '../models/blog-tag.model';


const sequelize =  new Sequelize({
    database: 'blog-mapstrip',
    dialect: 'mysql',
    username: 'root',
    password: '',
    storage: ':memory:'
});
sequelize.addModels([User,Blog,File,Category,Tag,BlogTag]);
export  default sequelize;

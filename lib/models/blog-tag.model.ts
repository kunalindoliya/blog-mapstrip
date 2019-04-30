import {AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Tag} from "./tag.model";
import {Blog} from "./blog.model";

@Table
export class BlogTag extends Model<BlogTag>{
    @AutoIncrement
    @PrimaryKey
    @Column
    id! :number;

    @ForeignKey(()=>Blog)
    @Column
    blogId! :number;

    @ForeignKey(()=>Tag)
    @Column
    tagId! : number;
}
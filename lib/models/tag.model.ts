import {
    AllowNull,
    AutoIncrement,
    BelongsToMany,
    Column,
    CreatedAt,
    DeletedAt,
    Model,
    PrimaryKey,
    Table,
    Unique,
    UpdatedAt
} from "sequelize-typescript";
import {Blog} from "./blog.model";
import {BlogTag} from "./blog-tag.model";

@Table
export class Tag extends Model<Tag>{
    @AutoIncrement
    @PrimaryKey
    @Column
    id! :number;

    @AllowNull(false)
    @Unique
    @Column
    title! : string;

    @BelongsToMany(()=>Blog,()=>BlogTag)
    blogs! :Blog[];

    @CreatedAt
    createdAt;

    @UpdatedAt
    updatedAt;

    @DeletedAt
    deletedAt;
}
import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    BelongsToMany,
    Column,
    CreatedAt,
    DataType,
    DeletedAt,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt
} from "sequelize-typescript";
import {User} from "./user.model";
import {Category} from "./category.model";
import {Tag} from "./tag.model";
import {BlogTag} from "./blog-tag.model";


@Table
export class Blog extends Model<Blog>{
    @AutoIncrement
    @PrimaryKey
    @Column
    id! :number;

    @AllowNull(false)
    @Column
    title! : string;

    @AllowNull(false)
    @Column
    category_name! : string;

    @AllowNull(false)
    @Column
    stub! : string;

    @AllowNull(false)
    @Column
    status! : string;

    @AllowNull(false)
    @Column
    coverImage! : string;

    @Column
    thumbnailImage! : string;

    @Column
    externalResource! : string;

    @Column
    externalResourceType! : string;

    @Column(DataType.TEXT)
    tags_name! : string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    shortDescription! : string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    data! : string;

    @ForeignKey(()=>User)
    @Column
    userId! : number;

    @BelongsTo(()=>User)
    user! :User;

    @ForeignKey(()=>Category)
    @Column
    categoryId! : number;

    @BelongsTo(()=>Category)
    category! :Category;

    @BelongsToMany(()=>Tag,()=>BlogTag)
    tags! :Tag[];

    @CreatedAt
    createdAt;

    @UpdatedAt
    updatedAt;

    @DeletedAt
    deletedAt;
}
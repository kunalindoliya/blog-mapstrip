import {
    AllowNull,
    AutoIncrement,
    Column,
    CreatedAt,
    DeletedAt,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    Unique,
    UpdatedAt
} from "sequelize-typescript";
import {Blog} from "./blog.model";


@Table
export class Category extends Model<Category>{
    @AutoIncrement
    @PrimaryKey
    @Column
    id! :number;

    @AllowNull(false)
    @Unique
    @Column
    title! : string;

    @HasMany(()=>Blog)
    blogs! :Blog[];

    @CreatedAt
    createdAt;

    @UpdatedAt
    updatedAt;

    @DeletedAt
    deletedAt;
}
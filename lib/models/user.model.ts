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
export class User extends Model<User> {

    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @AllowNull(false)
    @Column
    firstName!: string;

    @AllowNull(false)
    @Column
    lastName!: string;

    @AllowNull(false)
    @Unique
    @Column
    email!: string;

    @AllowNull(false)
    @Column
    password!: string;

    @HasMany(()=>Blog)
    blogs! : Blog[];

    @Column
    avatar! : string;

    @CreatedAt
    createdAt;

    @UpdatedAt
    updatedAt;

    @DeletedAt
    deletedAt;
}

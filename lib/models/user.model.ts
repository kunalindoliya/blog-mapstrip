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
    @Unique
    @Column
    index!: number;

    @PrimaryKey
    @Column
    id!: string;

    @AllowNull(false)
    @Column
    firstName!: string;

    @AllowNull(false)
    @Column
    lastName!: string;

    @AllowNull(false)
    @Column
    email!: string;

    @AllowNull(false)
    @Column
    password!: string;

    @HasMany(()=>Blog)
    blogs! : Blog[];

    @CreatedAt
    createdAt;

    @UpdatedAt
    updatedAt;

    @DeletedAt
    deletedAt;
}

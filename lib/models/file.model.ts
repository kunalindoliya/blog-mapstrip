import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    CreatedAt,
    DeletedAt,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    Unique,
    UpdatedAt
} from "sequelize-typescript";
import {Blog} from "./blog.model";


@Table
export class File extends Model<File>{
    @AutoIncrement
    @Unique
    @Column
    index!: number;

    @PrimaryKey
    @Column
    id!: string;

    @AllowNull(false)
    @Column
    url!: string;

    @ForeignKey(()=>Blog)
    @Column
    blogId! : string;

    @BelongsTo(()=>Blog)
    blog! : Blog;

    @CreatedAt
    createdAt;

    @UpdatedAt
    updatedAt;

    @DeletedAt
    deletedAt;
}
import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    DeletedAt,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    Unique,
    UpdatedAt
} from "sequelize-typescript";
import {User} from "./user.model";
import {File} from "./file.model";


@Table
export class Blog extends Model<Blog>{
    @AutoIncrement
    @Unique
    @Column
    index! :number;

    @PrimaryKey
    @Column
    id! : string;

    @AllowNull(false)
    @Column
    title! : string;

    @AllowNull(false)
    @Column
    category! : string;

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
    tags! : string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    shortDescription! : string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    data! : string;

    @ForeignKey(()=>User)
    @Column
    userId! : string;

    @BelongsTo(()=>User)
    user! :User;

    @HasMany(()=>File)
    files!: File[];

    @CreatedAt
    createdAt;

    @UpdatedAt
    updatedAt;

    @DeletedAt
    deletedAt;
}
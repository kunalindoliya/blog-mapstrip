import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    DeletedAt,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    Unique,
    UpdatedAt
} from "sequelize-typescript";
import {User} from "./user.model";

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
    @Column(DataType.TEXT)
    description! : string;

    @Column
    file! : string

    @ForeignKey(()=>User)
    @Column
    userId! : string;

    @BelongsTo(()=>User)
    user! :User;

    @CreatedAt
    createdAt;

    @UpdatedAt
    updatedAt;

    @DeletedAt
    deletedAt;
}
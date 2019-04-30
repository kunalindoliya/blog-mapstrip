import {
    AllowNull,
    AutoIncrement,
    Column,
    CreatedAt,
    DeletedAt,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt
} from "sequelize-typescript";


@Table
export class File extends Model<File>{
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @AllowNull(false)
    @Column
    url!: string;


    @CreatedAt
    createdAt;

    @UpdatedAt
    updatedAt;

    @DeletedAt
    deletedAt;
}
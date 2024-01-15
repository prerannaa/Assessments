import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';


@Table({
    timestamps: true,
    tableName: "users",
    modelName: "User",
})

class User extends Model {
    @Column({
        primaryKey: true,
        type:DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare userId: string;

    @Column({
        type:DataType.STRING(255),
        allowNull: false,
        unique: true,
    })
    declare username: string;

    @Column({
        type:DataType.STRING(255),
        allowNull: false,
    })
    declare password: string;

    @Column({
        type:DataType.STRING(255),
        allowNull: false,
        unique: true,
    })
    declare email: string;

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;
}

export default User;

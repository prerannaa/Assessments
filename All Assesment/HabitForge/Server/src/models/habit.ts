import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BelongsTo } from 'sequelize-typescript';
import User from './user';

@Table({
    timestamps: true,
    tableName: "habits",
    modelName: "Habit",
})

class Habit extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;

    @Column({
        type:DataType.STRING(255),
        allowNull: false,
    })
    declare title: string;
    @Column({
        type:DataType.TEXT,
    })
    declare notes: string
    @Column({
        type:DataType.ENUM('Easy','Medium', 'Difficult'),
        defaultValue: "Easy",
        allowNull: false,
    })
    declare difficulty: string
    @Column({
        type:DataType.DATE,
        allowNull: true,
    })
    declare startDate: Date
    @Column({
        type:DataType.ENUM('Daily', 'Weekly', 'Monthly', 'Yearly'),
        defaultValue: "Daily",
        allowNull: false,
    })
    declare repeatSchedule: string
    @Column({
        type:DataType.INTEGER,
        allowNull:true
    })
    declare reminderInterval: string
    @Column({
        type: DataType.TIME,
        allowNull: true
    })
    declare reminderTime: string;

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;
}


export default Habit;
import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BelongsTo, ForeignKey } from 'sequelize-typescript';
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
    declare habitId: string;

    @Column({
        type:DataType.STRING(255),
    })
    declare title: string;

    @Column({
        type:DataType.TEXT,
    })
    declare notes: string

    @Column({
        type:DataType.ENUM('Easy','Medium', 'Difficult'),
        defaultValue: "Easy",
    })
    declare difficulty: string

    @Column({
        type:DataType.STRING(255),
    })
    declare startDate: string

    @Column({
        type:DataType.ENUM('Daily', 'Weekly', 'Monthly', 'Yearly'),
        defaultValue: "Daily",
    })
    declare repeatSchedule: string

    @Column({
        type:DataType.INTEGER,
    })
    declare reminderInterval: string

    @Column({
        type: DataType.STRING(255),
    })
    declare reminderTime: string;

    // @ForeignKey(()=> User)
    // @Column({
    //     type: DataType.UUID,
    // })
    // declare userId: string;

    // @BelongsTo(() => User)
    // declare user: string;

    @CreatedAt
    declare created_at: Date;

    @UpdatedAt
    declare updated_at: Date;
}


export default Habit;
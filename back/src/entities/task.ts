import {Entity, Column, PrimaryColumn, BaseEntity, PrimaryGeneratedColumn }from "typeorm";

@Entity()
export class Task extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    checked: boolean;

    @Column()
    content: string;

    @Column()
    priority: string;

    @Column()
    parentTask: number;

    constructor(checked: boolean, content: string, priority: string, parentTask: number) {
        super(),
        this.checked = checked,
        this.content = content,
        this.priority = priority,
        this.parentTask = parentTask
    }
}
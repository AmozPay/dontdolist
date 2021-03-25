import { Task } from "../entities/task";
import { dbInitialize } from "../appDatabase";
import {Connection, BaseEntity, getManager, EntityManager} from "typeorm";

export async function createTask(parentTask: number, connect: Connection) {
    let newTask: object = new Task(false, "", "low", parentTask);
    const taskRepo = await connect.getRepository(Task);
    await taskRepo.save(newTask);
    return newTask;
}

export async function fetchAllTasks(parentTask: number, connect: Connection) {
    const taskRepo = await connect.getRepository(Task);
    const tasks = taskRepo.find({
        select: ["parentTask", "id", "content", "priority", "checked"],
        where:  {"parentTask" : parentTask},
    })
    return tasks;
}

export async function fetchDoneTasks(parentTask: number, connect: Connection) {
    const taskRepo = await connect.getRepository(Task);
    const tasks = taskRepo.find({
        select: ["parentTask", "id", "content", "priority", "checked"],
        where:  {"parentTask" : parentTask, "checked": true},
    })
    return tasks;
}

export async function fetchTodoTasks(parentTask: number, connect: Connection) {
    const taskRepo = await connect.getRepository(Task);
    const tasks = taskRepo.find({
        select: ["parentTask", "id", "content", "priority", "checked"],
        where:  {"parentTask" : parentTask, "checked": false},
    })
    return tasks;
}

export async function updateContent(taskId: number, content: string, connect: Connection) {
    let taskRepo = await connect.getRepository(Task);

    taskRepo.update({id: taskId}, {content: content});
    return 200;
}

export async function updatePriority(taskId: number, priority: string, connect: Connection) {
    let taskRepo = await connect.getRepository(Task);

    taskRepo.update({id: taskId}, {priority: priority});
    return 200;
}

export async function updateChecked(taskId: number, checked: boolean, connect: Connection) {
    let taskRepo = await connect.getRepository(Task);

    taskRepo.update({id: taskId}, {checked: checked});
    return 200;
}

export async function deleteTask(taskId: number, connect: Connection) {
    let taskRepo = await connect.getRepository(Task);

    taskRepo.delete({id: taskId});
}
import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from  'body-parser'
import { dbInitialize } from './appDatabase'
import * as models from './models/task'
import { API_PORT, API_HOST } from './appConfig'

var app = express();
app.use(bodyParser.json())
app.use(cookieParser());
const PORT = API_PORT;
const HOST = API_HOST;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
   res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'content-type')
    next();
});

async function main() {
    console.log("starting app...")
    const connect = await dbInitialize();

    app.put("/tasks", async function (req: Request, res: Response) {
        const parentTask = req.body.parentTask;
        let tasks:any = [];

        console.log("A task fetching request was received")
        switch (req.body.tasks) {
            case "all":
                tasks = await models.fetchAllTasks(parentTask, connect);
                break;
            case "todo":
                tasks = await models.fetchTodoTasks(parentTask, connect);
                break;
            case "done":
                tasks = await models.fetchDoneTasks(parentTask, connect);
                break;
        }
        console.log("sending tasks");
        res.status(200).send(Object.values(tasks));
    })

    app.post("/tasks", async function (req: Request, res: Response) {
        let task;
        const parentTask = req.body.parentTask;

        if (req.body.add) {
            console.log("A task creation request was received");
            task = await models.createTask(parentTask, connect);
            console.log("task created")
            res.status(200).send(task);
        } else if (req.body.update) {
            console.log("A task update request was received")
            switch (req.body.update) {
                case "content":
                    task = await models.updateContent(req.body.taskId, req.body.content, connect);
                    break;
                case "priority":
                    task = await models.updatePriority(req.body.taskId, req.body.priority, connect);
                    break;
                case "check":
                    console.log(`Received check update, ${req.body.taskId}, ${req.body.checked}`);
                    task = await models.updateChecked(req.body.taskId, req.body.checked, connect);
                    break;
            }
            res.status(200).send(task);
        } else {
            res.status(400).send("Bad Request");
        }
    })

    app.delete("/tasks", async function (req: Request, res: Response) {
        console.log("A task delete request was received");
        await models.deleteTask(req.body.taskId, connect);
        res.status(200).send("Task deleted");
    })

    app.listen(PORT, HOST, () => {console.log(`app listening on ${HOST}:${PORT}`)});
}

main();
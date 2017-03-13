import {Injectable} from "@angular/core";
import {Task} from "../models/task";

@Injectable()
export class TaskService {

    private tasks:Array<Task> = [
        new Task("Task 1 (AOT)", false),
        new Task("Task 2 (AOT)", false),
        new Task("Task 3 (AOT)", false),
    ];

    getTasks():Array<Task> {
        return this.tasks;
    }

    addTask(name:string) {
        this.tasks.push(new Task(name, false));
    }

}
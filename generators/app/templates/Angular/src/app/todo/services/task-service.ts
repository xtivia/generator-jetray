import {Injectable} from "@angular/core";
import {Task} from "../models/task";

@Injectable()
export class TaskService {

    private tasks:Array<Task> = [
        new Task("Clean out the garage", false),
        new Task("Repaint the washroom", false),
        new Task("Unpack new arrivals in storeroom", false),
    ];

    getTasks():Array<Task> {
        return this.tasks;
    }

    addTask(name:string) {
        this.tasks.push(new Task(name, false));
    }

}
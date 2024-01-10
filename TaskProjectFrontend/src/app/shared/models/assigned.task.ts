import { FormControl } from "@angular/forms";
import { Tasks } from "../../features/tasks/models/Task";
import { Employers } from "../../features/employers/models/employer";

export class AssignedTasks
{
    id_assigned_task?: number;
    employer?:Employers
    task?:Tasks
}

export interface AssignedTaskForm
{
    id_assigned_task?: FormControl<number>;
    employer?:FormControl<Employers>;
    task?:FormControl<Tasks>;
}
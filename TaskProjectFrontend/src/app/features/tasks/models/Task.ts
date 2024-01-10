export class Tasks
{
    id_task?: number;
    title?:string;
    description?:string;
    state?:States
    start_date?:string
    end_date?:string
}

import { FormControl } from "@angular/forms";
import { States } from "../../../shared/models/state";

export interface TaskForm
{
    id_task?: FormControl<number>;
    title?:FormControl<string>;
    description?:FormControl<string>;
    state?:FormControl<States>
    start_date?:FormControl<string>;
    end_date?:FormControl<string>;
}
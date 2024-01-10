export class Employers
{
    id_employer?: number;
    name?:string;
    surname?:string;
    email?:string
}

import { FormControl } from "@angular/forms";

export interface EmployerForm
{
    id_employer: FormControl<number>
    name:FormControl<string>
    surname:FormControl<string>
    email:FormControl<string>
}
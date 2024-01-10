import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { TasksComponent } from "./components/tasks.component";
import { TaskFormComponent } from "./components/task.form/task.form.component";
import { TaskFormEditComponent } from "./components/task-form-edit/task-form-edit.component";

const tasksRoutes: Routes = [

        {path:'tasks', component:TasksComponent, children: [
            {path:'tasks-form', component:TaskFormComponent},
            {path:'tasks-form/:id', component:TaskFormEditComponent}
        ]}
]

@NgModule({
    imports: [RouterModule.forChild(tasksRoutes)],
    exports: [RouterModule]
})

export class tasksRoutingModule {}
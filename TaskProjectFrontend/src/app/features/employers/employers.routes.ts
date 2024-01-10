import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { EmployersComponent } from "./components/employers.component";
import { EmployerFormComponent } from "./components/employer.form/employer.form.component";
import { EmployerFormEditComponent } from "./components/employer.form.edit/employer.form.edit.component";

const employersRoutes: Routes = [

        {path:'employers', component:EmployersComponent, children: [
            {path:'employers-form', component:EmployerFormComponent},
            {path:'employers-form/:id', component:EmployerFormEditComponent}
        ]}
]

@NgModule({
    imports: [RouterModule.forChild(employersRoutes)],
    exports: [RouterModule]
})

export class employersRoutingModule {}
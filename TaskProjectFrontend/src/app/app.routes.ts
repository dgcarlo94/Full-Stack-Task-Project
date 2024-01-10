import { Routes } from '@angular/router';
import { TaskAppComponent } from './core/home/components/task.app.component';
import { PageNotFoundComponent }from './core/page.not.found/page.not.found.component'

export const routes: Routes = [

    {path:'', redirectTo: 'task-app', pathMatch: 'full'},
    {
        path:'task-app', 
        component: TaskAppComponent,
        children:[{
            path: 'employers',
            loadChildren: () => import('./features/employers/employers.routes').then(m => m.employersRoutingModule)
        },
        {
            path: 'tasks',
            loadChildren: () => import('./features/tasks/tasks.routes').then(m => m.tasksRoutingModule)
        }],        
    },
    {path:'*', component: PageNotFoundComponent}
    
    /* 
    {path:'', redirectTo:'task-app', pathMatch: 'full'},
    {path:'task-app', component:TaskAppComponent, children:[
        {path:'employers', component:EmployersComponent, children: [
            {path:'employers-form', component:EmployerFormComponent},
            {path:'employers-form/:id', component:EmployerFormEditComponent}
        ]},
        {path:'tasks', component:TasksComponent, children: [
            {path:'tasks-form', component:TaskFormComponent},
            {path:'tasks-form/:id', component:TaskFormEditComponent}
        ]},
        {path:'tasks-form/:id', component:TaskFormComponent}
    ]},
    {path:'**', component:PageNotFoundComponent},
    */
];

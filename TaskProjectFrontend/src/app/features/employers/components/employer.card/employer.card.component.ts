import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { ShadowBoxDirective } from '../../../../shared/directives/shadow-box.directive';
import { Employers } from '../../models/employer';
import { States } from '../../../../shared/models/state';
import { AssignedTasks } from '../../../../shared/models/assigned.task';
import { AssignedTasksService } from '../../../../core/services/assigned.tasks.service';
import { TasksService } from '../../../tasks/services/tasks.service';
import { EmployersService } from '../../services/employers.service';
import { StatesService } from '../../../../core/services/states.service';
import { Tasks } from '../../../tasks/models/Task';

@Component({
  selector: 'app-employer-card',
  standalone: true,
  imports: [RouterModule, ShadowBoxDirective],
  templateUrl: './employer.card.component.html',
  styleUrl: './employer.card.component.scss'
})
export class EmployerCardComponent {

  @Input('employer') employer?: Employers;
  @Output() employerRemoved: EventEmitter<any> = new EventEmitter();

  states: States[] = [];
  assignedTasks:AssignedTasks[] = [];
  toggleAssignedTask = false;
  private destroy$ = new Subject<void>();

  constructor(
    private assignedTaskService: AssignedTasksService,
    private tasksService: TasksService, 
    private employersService:EmployersService,
    private statesService: StatesService,
    private readonly router: Router
    ){}

  public showTasks()
  {
    if(this.toggleAssignedTask == false)
      this.toggleAssignedTask = true;
    else
      this.toggleAssignedTask = false;

    this.assignedTaskService.getAssignedTasks().pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe({
      next: response => {
        this.assignedTasks = response;
        this.statesService.getStates().pipe(
          debounceTime(500),
          distinctUntilChanged(),
          takeUntil(this.destroy$)
        ).subscribe({
          next: data => {
            this.states = data;
            console.log('get states succeded!');
          },
          error: err => {
            console.log(err);
          }
        })
      },
      error: err => {
        console.error(err);
      }
    })
  }

  public setTaskCompleted(task:Tasks | undefined)
  {
    if(task)
    {
      const taskForm = this.tasksService.getTaskForm();
      taskForm.get('id_task')?.setValue(task.id_task);
      taskForm.get('title')?.setValue(task.title);
      taskForm.get('description')?.setValue(task.description);
      taskForm.get('start_date')?.setValue(task.start_date);
      taskForm.get('end_date')?.setValue(task.end_date);
      taskForm.get('state')?.setValue(this.states.find(state => state.state === "COMPLETED"));
      this.tasksService.setTask(taskForm).pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => {
          this.showTasks();
          console.log("edit task succeded!");
        },
        error: err => {
          console.log(err);
        }
      })
    }
  }

  public removeEmployer(id?: number) {
    this.employersService.removeEmployer(id).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        console.log('Employer succesfully removed');
        this.employerRemoved.emit();
        this.router.navigateByUrl("/task-app/employers/employers");
      },
      error: err => {
        console.error('Error occurred while removing an employer');
      }
    });
  }

  public removeAssignedTask(id_assigned_task: number | undefined, task: Tasks | undefined)
  {
    if(id_assigned_task)
      this.assignedTaskService.removeAssignedTask(id_assigned_task).pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        const taskForm = this.tasksService.getTaskForm();
        taskForm.get('id_task')?.setValue(task?.id_task);
        taskForm.get('title')?.setValue(task?.title);
        taskForm.get('description')?.setValue(task?.description);
        taskForm.get('start_date')?.setValue(task?.start_date);
        taskForm.get('end_date')?.setValue(task?.end_date);
        taskForm.get('state')?.setValue(this.states.find(state => state.state === "CREATED"));
      this.tasksService.setTask(taskForm).pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => {
          this.showTasks();
          console.log("edit task succeded!");
        },
        error: err => {
          console.log(err);
        }
      })
        this.showTasks();
        console.log('Assigned Task succesfully removed');  
        this.router.navigateByUrl("/task-app/employers/employers");
      },
      error: err => {
        console.error('Error occurred while removing an assigned task');
      }
    })
    else 
      console.error("id_assigned_task not recognised");
  }
}

import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Tasks } from '../../models/Task';
import { TasksService } from '../../services/tasks.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SetBorderRedDirective } from '../../../../shared/directives/set-border-red.directive';
import { States } from '../../../../shared/models/state';
import { StatesService } from '../../../../core/services/states.service';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-task.form',
  standalone: true,
  imports: [ReactiveFormsModule, SetBorderRedDirective],
  templateUrl: './task.form.component.html',
  styleUrl: './task.form.component.scss'
})
export class TaskFormComponent {

  task_id:number = 0;
  task: Tasks = new Tasks();
  taskForm = this.tasksService.getTaskForm();
  states: States[] = []
  private destroy$ = new Subject<void>();

  constructor(
    private readonly tasksService: TasksService, 
    private readonly router: Router,
    private readonly statesService: StatesService
    ){}

  ngOnInit()
  {
    this.statesService.getStates().pipe(
      debounceTime(50),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe({
      next: data => {
        this.states = data;
        this.taskForm.get('state')?.setValue(this.states.find(state => state.state === "CREATED"))
      },
      error: err => {
        console.log(err);
      }
    })
  }

  public addTask()
  {
    this.tasksService.addTask(this.taskForm).subscribe({
      next: response => {
        console.log('Insert Success');
        this.router.navigateByUrl('/task-app/tasks/tasks');
      },
      error: err => {
        console.error(err);
      }
    })
  }
}

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SetBorderRedDirective } from '../../../../shared/directives/set-border-red.directive';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { StatesService } from '../../../../core/services/states.service';
import { States } from '../../../../shared/models/state';
import { AssignedTasksService } from '../../../../core/services/assigned.tasks.service';
import { Tasks } from '../../models/Task';
import { CommonModule } from '@angular/common';
import { EmployersService } from '../../../employers/services/employers.service';
import { Employers } from '../../../employers/models/employer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SetBorderRedDirective],
  templateUrl: './task-form-edit.component.html',
  styleUrl: './task-form-edit.component.scss'
})
export class TaskFormEditComponent implements OnInit, OnChanges {
  @Input('id') set id(id:string)
  {
    this.id_task = Number.parseInt(id);
  }

  id_task: number = 0;
  task?: Tasks;
  taskForm = this.tasksService.getTaskForm();
  assignedTaskForm = this.assignedTasksService.getAssignedTaskForm();
  states: States[] = [];
  employers: Employers[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private readonly tasksService:TasksService,
    private readonly assignedTasksService: AssignedTasksService,
    private readonly statesService: StatesService,
    private readonly employersService: EmployersService,
    private readonly route: Router
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit()
  {
    this.taskForm.valueChanges.subscribe(value =>{
      console.log(value);
    })
    this.statesService.getStates().pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe({
      next: data => {
        this.states = data;
        console.log('get states succeded')
      },
      error: err => {
        console.log(err);
      }
    });

    this.tasksService.getTasks().pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe({
      next: data => {
        this.task = data.find(task => task.id_task == this.id_task);
        this.taskForm = this.tasksService.getTaskForm();
        this.taskForm.get('id_task')?.setValue(this.id_task)
        this.taskForm.get('title')?.setValue(this.task?.title);
        this.taskForm.get('description')?.setValue(this.task?.description);
        this.taskForm.get('start_date')?.setValue(this.task?.start_date);
        this.taskForm.get('end_date')?.setValue(this.task?.end_date);
        this.taskForm.get('state')?.setValue(this.task?.state); 
        this.assignedTaskForm.get('task')?.setValue(this.task);
        console.log('task succesfully updated')
      },
      error: err => {
        console.log(err);
      }
    });

    this.employersService.getEmployers().pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe({
      next: data => {
        this.employers = data;
        console.log('employers get succeded');
      },
      error: err => {
        console.log(err);
      }
    });
  }

  public editTask()
  {
    this.tasksService.setTask(this.taskForm).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        console.log(this.taskForm.value);
        console.log('set task succeded');
        this.route.navigateByUrl('/task-app/tasks/tasks')
      },
      error: err => {
        console.log(err);
      }
    });
  }

  public assignTask()
  {
    this.assignedTasksService.getAssignedTasks().pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe({
      next: data => {
        const assignedTask = data.filter(assignedTask => assignedTask.task?.id_task === this.id_task);

        if(assignedTask.length > 1)
        {
          console.error("This task has been assigned to more than one employer!");
        }
        else if(assignedTask.length == 1)
        {
          this.assignedTaskForm.get('id_assigned_task')?.setValue(assignedTask.at(0)?.id_assigned_task);
          this.assignedTasksService.setAssignedTask(this.assignedTaskForm).pipe(
            debounceTime(500),
            distinctUntilChanged(),
            takeUntil(this.destroy$)
          ).subscribe({
            next: () => {
              this.taskForm.get('id_task')?.setValue(this.task?.id_task);
              this.taskForm.get('title')?.setValue(this.task?.title);
              this.taskForm.get('description')?.setValue(this.task?.description);
              this.taskForm.get('start_date')?.setValue(this.task?.start_date);
              this.taskForm.get('end_date')?.setValue(this.task?.end_date);
              this.taskForm.get('state')?.setValue(this.states.find(state => state.state === 'IN_PROGRESS'));
              this.editTask();
              console.log(this.taskForm.value);
              console.log("set assigned task succeded!");
            },
            error: err => {
              console.log(err);
            }
          })
        }
        else {
          this.assignedTasksService.addAssignedTask(this.assignedTaskForm).pipe(
            debounceTime(500),
            distinctUntilChanged(),
            takeUntil(this.destroy$)
          ).subscribe({
            next: () => {
              this.taskForm.get('id_task')?.setValue(this.task?.id_task);
              this.taskForm.get('title')?.setValue(this.task?.title);
              this.taskForm.get('description')?.setValue(this.task?.description);
              this.taskForm.get('start_date')?.setValue(this.task?.start_date);
              this.taskForm.get('end_date')?.setValue(this.task?.end_date);
              this.taskForm.get('state')?.setValue(this.states.find(state => state.state === 'IN_PROGRESS'));
              this.editTask();
              console.log("add assigned task succeded");
              this.route.navigateByUrl('/task-app/tasks/tasks');
            },
            error: err => {
              console.log(err);
            }
          })
        }
      }
    });
  }   
}

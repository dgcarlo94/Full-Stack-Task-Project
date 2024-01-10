import { Component, Input } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs';
import { TasksService } from '../services/tasks.service';
import { Tasks } from '../models/Task';
import { TaskCardComponent } from './task-card/task-card.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [RouterModule, TaskCardComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {

  @Input() tasks: Tasks[] = []

  private destroy$ = new Subject<void>();

  constructor(private tasksService: TasksService, private readonly router: Router){}

  ngOnInit(): void {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.getTasks();
      },
      error: err => {
        console.error('There was an error gathering tasks');
      }
    })
    
    this.getTasks();
  }

  public getTasks()
  {
    this.tasksService.getTasks().pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe({
      next: response => {
        this.tasks = response;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  public getTaskForm()
  {
    this.router.navigateByUrl("/task-app/tasks/tasks/tasks-form");
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tasks } from '../../models/Task';
import { AssignedTasks } from '../../../../shared/models/assigned.task';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { TasksService } from '../../services/tasks.service';
import { Router, RouterModule } from '@angular/router';
import { EmployersService } from '../../../employers/services/employers.service';
import { ShadowBoxDirective } from '../../../../shared/directives/shadow-box.directive';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [ShadowBoxDirective, RouterModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {

  @Input('task') task?: Tasks;
  @Output() notify: EventEmitter<any> = new EventEmitter();

  assignedTasks:AssignedTasks[] = [];
  private destroy$ = new Subject<void>();

  constructor(private taskService: TasksService, private readonly router: Router, private employersService:EmployersService){}

  public removeTask(id?: number) {
    this.taskService.removeTask(id).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.notify.emit();
        console.log('Task succesfully removed');
        this.router.navigateByUrl("/task-app/tasks/tasks");
      },
      error: err => {
        console.error('Error occurred while removing a task');
      }
    });
  }
}

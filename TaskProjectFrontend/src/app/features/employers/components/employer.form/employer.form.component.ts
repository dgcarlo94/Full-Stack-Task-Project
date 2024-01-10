import { Component, OnDestroy } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SetBorderRedDirective } from '../../../../shared/directives/set-border-red.directive';
import { Employers } from '../../models/employer';
import { EmployersService } from '../../services/employers.service';


@Component({
  selector: 'app-employer.form',
  standalone: true,
  imports: [ReactiveFormsModule, SetBorderRedDirective],
  templateUrl: './employer.form.component.html',
  styleUrl: './employer.form.component.scss'
})
export class EmployerFormComponent  implements OnDestroy {

  employers: Employers[] = [];

  employerForm = this.employersService.getEmployerForm();
  private destroy$ = new Subject<void>();

  constructor(private employersService:EmployersService, private readonly router: Router){}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit()
  {

  }

  public addEmployer()
  {
    this.employersService.addEmployer(this.employerForm).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe({
      next: response => {
        console.log('Insert Success');
        this.router.navigateByUrl('/task-app/employers');
      },
      error: err => {
        console.error('There was an error adding the employer');
      }
    })
  }
}

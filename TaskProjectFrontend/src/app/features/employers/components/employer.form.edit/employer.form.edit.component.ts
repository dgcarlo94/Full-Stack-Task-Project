import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SetBorderRedDirective } from '../../../../shared/directives/set-border-red.directive';
import { Employers } from '../../models/employer';
import { EmployersService } from '../../services/employers.service';

@Component({
  selector: 'app-employer.form.edit',
  standalone: true,
  imports: [ReactiveFormsModule, SetBorderRedDirective],
  templateUrl: './employer.form.edit.component.html',
  styleUrl: './employer.form.edit.component.scss'
})
export class EmployerFormEditComponent {

  @Input('id') set id(id:string)
  {
    this.employer_id = Number.parseInt(id);
  }

  employer_id:number = 0;
  employer?: Employers;

  employerForm =  this.employersService.getEmployerForm();

  constructor(private employersService:EmployersService, private readonly router: Router){}

  ngOnInit()
  {
    this.employersService.getEmployers().subscribe(data => {
      this.employer = data.find(employer => employer.id_employer === this.employer_id)
    })
  }

  public editEmployer()
  {
    const id = this.employer?.id_employer || 0;
      this.employerForm.get('id_employer')?.setValue(id);
      this.employersService.setEmployer(this.employerForm).subscribe({
        next: response => {
          console.log('Edit Success');
          this.router.navigateByUrl('/task-app/employers');
        },
        error: err => {
          console.error('Something went wrong');
        } 
      })
         
  }
}

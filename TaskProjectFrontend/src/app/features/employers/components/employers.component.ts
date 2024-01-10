import { Component, Input, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs';
import { EmployerCardComponent } from './employer.card/employer.card.component';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployersService } from '../services/employers.service';
import { ShadowBoxDirective } from '../../../shared/directives/shadow-box.directive';
import { Employers } from '../models/employer';

@Component({
  selector: 'app-employers',
  standalone: true,
  imports: [EmployerCardComponent, RouterModule, CommonModule, ShadowBoxDirective],
  templateUrl: './employers.component.html',
  styleUrl: './employers.component.scss'
})
export class EmployersComponent implements OnInit{

  @Input() employers: Employers[] = []

  private destroy$ = new Subject<void>();

  constructor(
    private employersService: EmployersService, 
    private readonly router: Router){}

  ngOnInit(): void {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      debounceTime(50),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.getEmployers();
      },
      error: err => {
        console.error('There was an error gathering employers');
      }
    })
    
    this.getEmployers();
  }

  public getEmployers()
  {
    this.employersService.getEmployers().pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe({
      next: response => {
        this.employers = response;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  public getEmployerForm()
  {
    this.router.navigateByUrl("/task-app/employers/employers/employers-form");
  }

}

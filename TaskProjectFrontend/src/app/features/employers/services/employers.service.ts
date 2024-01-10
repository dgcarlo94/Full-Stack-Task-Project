import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { EmployerForm, Employers } from '../models/employer';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployersService {

  baseUrl?: string = environment.apiUrl + 'employers'

  constructor(private httpClient: HttpClient) { }

  public getEmployerForm(): FormGroup<EmployerForm> {
    return new FormGroup<EmployerForm>({
      id_employer: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required] }),
      name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)] }),
      surname: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)] }),
      email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email]})
    })
  }

  public getEmployers(): Observable<Employers[]> {
    return this.httpClient.get<Employers[]>(`${this.baseUrl}/getemployers`);
  }

  public removeEmployer(id?: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/deleteemployer/${id}`);
  }

  public setEmployer(employerForm: FormGroup<EmployerForm>): Observable<any>
  {
    const employer: Employers = employerForm.getRawValue();
    return this.httpClient.post(`${this.baseUrl}/updateemployer`, employer);
  }

  public addEmployer(employerForm: FormGroup<EmployerForm>):Observable<any>
  {
    const employer: Employers = employerForm.getRawValue();
    console.log(employer);
    return this.httpClient.post(`${this.baseUrl}/insertemployer`, employer);
  }
}

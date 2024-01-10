import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AssignedTaskForm, AssignedTasks } from '../../shared/models/assigned.task';
import { Employers } from '../../features/employers/models/employer';
import { Tasks } from '../../features/tasks/models/Task';
import { Observable } from 'rxjs';

export function notEmptyObjectValidator(): ValidatorFn {
  /*ValidatorFn serve come oggetto Validator personalizzato in un FormGroup, FormControl o FormArray*/
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    //Value mi dice se l'oggetto esiste, se non ci sono chiavi nell'oggetto e se l'oggetto è nella forma {}, perchè possono esistere anche oggetti di tipo Date, function, ecc...
    if (value && Object.keys(value).length === 0 && value.constructor === Object) {
      // L'oggetto è vuoto
      return { 'notEmptyObject': true };
    }
    return null; // L'oggetto non è vuoto o il valore non è un oggetto
  };
}

@Injectable({
  providedIn: 'root'
})
export class AssignedTasksService {

  baseUrl?: string = environment.apiUrl + 'assignedtasks'

  constructor(private httpClient: HttpClient) { }

  public getAssignedTaskForm(): FormGroup<AssignedTaskForm> {
    return new FormGroup<AssignedTaskForm>({
      id_assigned_task: new FormControl<number>(0, {nonNullable: true, validators: [Validators.required]}),
      employer: new FormControl<Employers>({}, {nonNullable: true, validators: [Validators.required, notEmptyObjectValidator()]}),
      task: new FormControl<Tasks>({}, {nonNullable: true, validators: [Validators.required, notEmptyObjectValidator()]})
    })
  }

  public getAssignedTasks(): Observable<AssignedTasks[]> {
    return this.httpClient.get<AssignedTasks[]>(`${this.baseUrl}/getassignedtasks`);
  }

  public removeAssignedTask(id?: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/deleteassignedtask/${id}`);
  }

  public setAssignedTask(assignedTaskForm: FormGroup<AssignedTaskForm>): Observable<any>
  {
    const task: AssignedTasks = assignedTaskForm.getRawValue();
    return this.httpClient.post(`${this.baseUrl}/updateassignedtask`, task);
  }

  public addAssignedTask(assignedTaskForm: FormGroup<AssignedTaskForm>):Observable<any>
  {
    const assignedTask: AssignedTasks = assignedTaskForm.getRawValue();
    return this.httpClient.post(`${this.baseUrl}/insertassignedtask`, assignedTask);
  }
}

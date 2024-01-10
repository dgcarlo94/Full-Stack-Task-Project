import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { TaskForm, Tasks } from '../models/Task';
import { States } from '../../../shared/models/state';
import { Observable } from 'rxjs';
import { endDateValidator } from '../directives/end-date.directive';

export function notEmptyObjectValidator(): ValidatorFn {
  /* ValidatorFn serve come oggetto Validator personalizzato in un FormGroup, FormControl o FormArray */
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    // Value mi dice se l'oggetto esiste, se non ci sono chiavi nell'oggetto e se l'oggetto è nella forma {}, perchè possono esistere anche oggetti di tipo Date, function, ecc...
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
export class TasksService {

  baseUrl?: string = environment.apiUrl + 'tasks'

  constructor(private httpClient: HttpClient) { }

  public getTaskForm(): FormGroup<TaskForm> {
    return new FormGroup<TaskForm>({
      id_task: new FormControl<number>(0, {nonNullable: true, validators: [Validators.required]}),
      title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(1), Validators.maxLength(100)] }),
      description: new FormControl<string>('', { nonNullable: true, validators: [Validators.minLength(0), Validators.maxLength(1000)] }),
      state: new FormControl<States>({value: {}, disabled:false}, {nonNullable: true, validators: [Validators.required, notEmptyObjectValidator()]}),
      start_date: new FormControl<string>('', { nonNullable: true, validators: [Validators.required]}),
      end_date: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    }, {validators: endDateValidator})
  }

  public getTasks(): Observable<Tasks[]> {
    return this.httpClient.get<Tasks[]>(`${this.baseUrl}/gettasks`);
  }

  public removeTask(id?: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/deletetask/${id}`);
  }

  public setTask(taskForm: FormGroup<TaskForm>): Observable<any>
  {
    const task: Tasks = taskForm.getRawValue();
    return this.httpClient.post(`${this.baseUrl}/updatetask`, task);
  }

  public addTask(taskForm: FormGroup<TaskForm>):Observable<any>
  {
    const task: Tasks = taskForm.getRawValue();
    return this.httpClient.post(`${this.baseUrl}/inserttask`, task);
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormEditComponent } from './task-form-edit.component';

describe('TaskFormEditComponent', () => {
  let component: TaskFormEditComponent;
  let fixture: ComponentFixture<TaskFormEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFormEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

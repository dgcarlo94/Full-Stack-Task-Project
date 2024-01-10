import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerFormEditComponent } from './employer.form.edit.component';

describe('EmployerFormEditComponent', () => {
  let component: EmployerFormEditComponent;
  let fixture: ComponentFixture<EmployerFormEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployerFormEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployerFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

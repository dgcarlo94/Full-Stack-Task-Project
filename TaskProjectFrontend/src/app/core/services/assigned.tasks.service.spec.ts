import { TestBed } from '@angular/core/testing';

import { AssignedTasksService } from './assigned.tasks.service';

describe('AssignedTasksService', () => {
  let service: AssignedTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignedTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ListandTaskService } from './listand-task.service';

describe('ListandTaskService', () => {
  let service: ListandTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListandTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

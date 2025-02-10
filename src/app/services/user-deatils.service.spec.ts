import { TestBed } from '@angular/core/testing';

import { UserDeatilsService } from './user-deatils.service';

describe('UserDeatilsService', () => {
  let service: UserDeatilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDeatilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

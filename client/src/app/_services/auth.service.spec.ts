import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';
import { HttpService } from 'app/_services/http.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HttpService, useValue: {} }
      ],
      imports: [
        RouterTestingModule
      ]
    });
  });

  it('should be created...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});

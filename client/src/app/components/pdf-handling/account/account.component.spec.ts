import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Md2Module } from 'md2';
import { Observable } from 'rxjs/Observable';

import { AccountComponent } from './account.component';
import { BookkeepService, HttpService } from 'app/_services';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let bkService: BookkeepService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BookkeepService,
        { provide: HttpService, useValue: {} }
      ],
      declarations: [
        AccountComponent
      ],
      imports: [
        FormsModule,
        MaterialModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        Md2Module
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    bkService = fixture.debugElement.injector.get(BookkeepService);
    spyOn(bkService, 'bookkeepAnnounced$').and.returnValue({ subscribe: () => { } });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

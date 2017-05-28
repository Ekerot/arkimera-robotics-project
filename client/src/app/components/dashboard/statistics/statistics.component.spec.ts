import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';

import { StatisticsComponent } from './statistics.component';
import { HttpService } from 'app/_services';
import { StatisticsService } from 'app/_services/statistics.service';
import { Observable } from 'rxjs/Rx';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;
  let httpService: HttpService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StatisticsComponent
      ],
      imports: [
        MaterialModule
      ],
      providers: [
        { provide: StatisticsService, useValue: {} },
        {
          provide: HttpService, useValue: {
            getAllFiles: () => { Observable.of(); },
            getBookedFiles: () => { }
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    httpService = fixture.debugElement.injector.get(HttpService);
    spyOn(httpService, 'getAllFiles').and.returnValue({ subscribe: () => { } });
    spyOn(httpService, 'getBookedFiles').and.returnValue({ subscribe: () => { } });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

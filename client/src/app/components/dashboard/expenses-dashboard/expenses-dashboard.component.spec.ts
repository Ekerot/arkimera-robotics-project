import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { CreateGraph } from '../create-graph';

import { ExpensesDashboardComponent } from './expenses-dashboard.component';
import { StatisticsService } from 'app/_services/statistics.service';
import { HttpService } from 'app/_services';
import { Observable } from 'rxjs/Rx';

describe('ExpensesDashboardComponent', () => {
  let component: ExpensesDashboardComponent;
  let fixture: ComponentFixture<ExpensesDashboardComponent>;
  let createGraph: CreateGraph;
  let spy: jasmine.Spy;
  let httpService: HttpService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExpensesDashboardComponent
      ],
      imports: [
        MaterialModule
      ],
      providers: [
        CreateGraph,
        { provide: StatisticsService, useValue: {} },
        { provide: HttpService, useValue: { getBookedFiles: () => { Observable.of(); } } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesDashboardComponent);
    component = fixture.componentInstance;
    createGraph = fixture.debugElement.injector.get(CreateGraph);
    spy = spyOn(createGraph, 'createLineGraph').and.returnValue({});
    httpService = fixture.debugElement.injector.get(HttpService);
    spyOn(httpService, 'getBookedFiles').and.returnValue({ subscribe: () => { } });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

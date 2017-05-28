import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { CreateGraph } from '../create-graph';

import { ProfitAndLossComponent } from './profit-and-loss.component';
import { StatisticsService } from '../../../_services/statistics.service';
import { HttpService } from 'app/_services';
import { Observable } from 'rxjs/Rx';

describe('ProfitAndLossComponent', () => {
  let component: ProfitAndLossComponent;
  let fixture: ComponentFixture<ProfitAndLossComponent>;
  let createGraph: CreateGraph;
  let spy: jasmine.Spy;
  let httpService: HttpService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfitAndLossComponent
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
    fixture = TestBed.createComponent(ProfitAndLossComponent);
    component = fixture.componentInstance;
    createGraph = fixture.debugElement.injector.get(CreateGraph);
    spy = spyOn(createGraph, 'createDoughnutGraph').and.returnValue({});
    httpService = fixture.debugElement.injector.get(HttpService);
    spyOn(httpService, 'getBookedFiles').and.returnValue({ subscribe: () => { } });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { CreateGraph } from '../create-graph';

import { ExpensesDashboardComponent } from './expenses-dashboard.component';

describe('ExpensesDashboardComponent', () => {
  let component: ExpensesDashboardComponent;
  let fixture: ComponentFixture<ExpensesDashboardComponent>;
  let createGraph: CreateGraph;
  let spy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExpensesDashboardComponent
      ],
      imports: [
        MaterialModule
      ],
      providers: [
        CreateGraph
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesDashboardComponent);
    component = fixture.componentInstance;
    createGraph = fixture.debugElement.injector.get(CreateGraph);
    spy = spyOn(createGraph, 'createLineGraph').and.returnValue({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

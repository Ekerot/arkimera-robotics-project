import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { CreateGraph } from '../create-graph';

import { IncomeDashboardComponent } from './income-dashboard.component';

describe('IncomeDashboardComponent', () => {
  let component: IncomeDashboardComponent;
  let fixture: ComponentFixture<IncomeDashboardComponent>;
  let createGraph: CreateGraph;
  let spy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IncomeDashboardComponent
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
    fixture = TestBed.createComponent(IncomeDashboardComponent);
    component = fixture.componentInstance;
    createGraph = fixture.debugElement.injector.get(CreateGraph);
    spy = spyOn(createGraph, 'createLineGraph').and.returnValue({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

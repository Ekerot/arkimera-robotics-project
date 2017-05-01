import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { CreateGraph } from '../create-graph';

import { ProfitAndLossComponent } from './profit-and-loss.component';

describe('ProfitAndLossComponent', () => {
  let component: ProfitAndLossComponent;
  let fixture: ComponentFixture<ProfitAndLossComponent>;
  let createGraph: CreateGraph;
  let spy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfitAndLossComponent
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
    fixture = TestBed.createComponent(ProfitAndLossComponent);
    component = fixture.componentInstance;
    createGraph = fixture.debugElement.injector.get(CreateGraph);
    spy = spyOn(createGraph, 'createDoughnutGraph').and.returnValue({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

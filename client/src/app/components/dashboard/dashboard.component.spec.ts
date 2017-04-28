import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';

import { DashboardComponent } from './dashboard.component';
import { MockComponent } from '../../_helpers/mock-component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        MockComponent({ selector: 'app-statistics'}),
        MockComponent({ selector: 'app-income-dashboard'}),
        MockComponent({ selector: 'app-profit-and-loss'}),
        MockComponent({ selector: 'app-expenses-dashboard'})
      ],
      imports: [
        MaterialModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfHandlingComponent } from './pdf-handling.component';

describe('PdfHandlingComponent', () => {
  let component: PdfHandlingComponent;
  let fixture: ComponentFixture<PdfHandlingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfHandlingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

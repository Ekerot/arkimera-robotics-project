import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

import { PdfComponent } from './pdf.component';
import { HttpService } from 'app/_services';

describe('PdfComponent', () => {
  let component: PdfComponent;
  let fixture: ComponentFixture<PdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpService, useValue: { getFilesReadyForExtraction: () => { return Observable.of() } } }
      ],
      declarations: [
        PdfComponent,
        PdfViewerComponent
      ],
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

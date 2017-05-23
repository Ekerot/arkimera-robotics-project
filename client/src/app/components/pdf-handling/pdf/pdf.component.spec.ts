import { BookkeepService } from '../../../_services/bookkeep.service';
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
  let bkService: BookkeepService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BookkeepService,
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
    bkService = fixture.debugElement.injector.get(BookkeepService);
    spyOn(bkService, 'bookkeepConfirmed$').and.returnValue({ subscribe: () => { } });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
